function delay(t, v) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, v), t)
    });
}
let avg;
const bitextApi = (comment) => {
    var route;
    fetch('https://svc02.api.bitext.com/sentiment/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer 6c306cd6a8b542be8d7b489d0c6f4c52'
        },
        body: JSON.stringify({
            language: 'eng',
            text: comment,
        })
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            route = data.resultid
        })
        delay(5000).then(() => {
            fetch('https://svc02.api.bitext.com/sentiment/' + route + '/', {
                method: 'Get',
                headers: {
                    'Authorization': 'bearer 6c306cd6a8b542be8d7b489d0c6f4c52'
                },
            })
                .then(res => {
                    return res.json();
                })
                .then(data1 => {
                    // console.log(data1.sentimentanalysis);
                    let kq = data1.sentimentanalysis.map((score) => {
                        return score.score
                    })
                    var sum = 0;
                    for (let i = 0; i < kq.length; i++) {
                        var parse = parseInt(kq[i]);
                        sum += parse;
                    }
                    
                    return sum/kq.length;
                })
        })
}
const printKq = () => {
    bitextApi('This travel trip is great, the company of service makes me very satisfied').then(a);
    console.log (a);
}
printKq();

// console.log('https://svc02.api.bitext.com/sentiment/'+route);
// fetch('https://svc02.api.bitext.com/sentiment/'+route,{
//     method: 'Get',
//     headers: {
//         'Authorization': 'bearer 2c3885ce0b394738946c50918cf8a7c1'
//     },
// })
// .then(res => {
//     return res.json();
// })
// .then(data => console.log(data))
// .catch(error => console.log('error'))