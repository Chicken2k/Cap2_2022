const fetch = require('node-fetch');

const OPENWEATHER_API_KEY = "a37b25d39fe5c106a88ad2d969774651";

const getWeatherInfo = city => 
    fetch(
        'http://api.openweathermap.org/data/2.5/weather?q=' + city +'&appid=' + OPENWEATHER_API_KEY
    )
    .then(response => response.json())
    .then(data => {
        const kelvin = data.main.temp;
        const celsius = Math.round(kelvin - 273.15);
        return celsius;
    })
    .catch(error => console.log(error));

module.exports = getWeatherInfo;