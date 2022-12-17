const mailjet = require ('node-mailjet')
.connect(process.env.API_KEY, process.env.SECRET_KEY)
const sendMail = (userRestaurant, user) => {
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
    "Messages":[
        {
        "From": {
            "Email": "nguyenanhdung462@gmail.com",
            "Name": `${userRestaurant.name}`
        },
        "To": [
            {
                "Email": `${user.email}`,
                "Name": `${user.name}`
            }
        ],
        "TemplateID": 4439653,
        "Subject": "Confirmed order restaurant",
        "TextPart": "My first Mailjet email",
        "HTMLPart": "Bàn bạn đặt đã được xác nhận. Chúc bạn có một bữa ăn ngon miệng.",
        "CustomID": "AppGettingStartedTest"
        }
    ]
    })
    request
    .then((result) => {
        console.log('successfully: ', result.body.Messages[0].To)
    })
    .catch((err) => {
        console.log('err: ',err.message);
    })
};

module.exports = {
    sendMail
}
