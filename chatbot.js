const dialogflow = require('dialogflow')
const dialogflowConfig = require('./config/config')
const getWeatherInfo = require('./weather');
const projectId = dialogflowConfig.project_id
const configuration = {
  credentials: {
    private_key: dialogflowConfig.private_key,
    client_email: dialogflowConfig.client_email,
  },
}
var https = require('https');
var http = require('http');
const sessionId = '997753'
const languageCode = 'en-US'
const sessionClient = new dialogflow.SessionsClient(configuration)
const sessionPath = sessionClient.sessionPath(projectId, sessionId)
const postData = (dataObj) => {
  const data = JSON.stringify(dataObj);

  const options = {
    hostname: 'localhost',
    port: 666,
    path: '/users',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);
    res.setEncoding('utf8');

    res.on('data', d => {
      console.log(d)
    });
  });

  req.on('error', error => {
    console.error(error);
  });

  req.write(data);
  req.end();
}
const postHoaDonCaNhan = (dataObj) => {
  const data = JSON.stringify(dataObj);
  console.log(data);
  const optionss = {
    hostname: 'localhost',
    port: 666,
    path: '/hoadoncanhans',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  const req = http.request(optionss, res => {
    console.log(`statusCode: ${res.statusCode}`);
    res.setEncoding('utf8');

    res.on('data', d => {
      console.log(d)
    });
  });

  req.on('error', error => {
    console.error(error);
  });

  req.write(data);
  req.end();
}
const talkToChatbot = async (message, userId) => {
  http.get('http://localhost:666/users', (resp) => {

    let result = 0;
    resp.setEncoding('utf8');

    // on succ
    resp.on('data', (d) => {
      result = d;
    });

    // on end
    resp.on('end', () => {
      JSON.parse(result);
      // console.log(result);
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  console.log('message ' + message)
  const botRequest = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: languageCode,
      },
    },
  }

  let response = await sessionClient
    .detectIntent(botRequest)
    .then((responses) => {
      // console.log(JSON.stringify(responses))

      var requiredResponse = responses[0].queryResult
      console.log(requiredResponse)
      if (requiredResponse.intent.displayName === 'detect-city') {
        const city = requiredResponse.parameters.fields['geo-city'].stringValue;
        //fetch the temperature from openweathermap
        return getWeatherInfo(city).then(temperature => {
          requiredResponse = 'Thời tiết hiện tại ở ' + city + ' có nhiệt độ là ' + temperature + '°C'
          return requiredResponse
        })
      }
      return requiredResponse
    })
    .catch((error) => {
      console.log('ERROR: ' + error)
    })

  // // Đăng ký user
  if (response.action === 'iDangkiUser') {
    const name = response.parameters.fields.name.stringValue
    const email = response.parameters.fields.email.stringValue
    const password = response.parameters.fields.password.stringValue
    if (name !== '' && email !== '' && password !== '') {
      const UserRoles = [{ roleId: 3 }]
      const status = 1;
      console.log(123)
      const res = await postData({ name, status, email, password, UserRoles })
      console.log(res)
    }
  }else if(response.action === 'iDangkiTour'){

    const time = response.parameters.fields.time.stringValue
    const locationEnd = response.parameters.fields.locationEnd.stringValue
    const locationStart = response.parameters.fields.locationStart.stringValue
    if (time !== '' && locationEnd !== '' && locationStart !== '') {
        const res = await postHoaDonCaNhan({ userId, noikhoihanh: locationStart, ngaykhoihanh: time.split('T')[0], diadiemdi: locationEnd, kiemduyet: 0, agree: 0 })
        console.log(res)
    }
  }
  console.log('hello' + response.action)

  return response
}

module.exports = talkToChatbot