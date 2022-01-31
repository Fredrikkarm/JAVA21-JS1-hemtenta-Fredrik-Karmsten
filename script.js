//https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=${key}&include=minutely&lang=[sv]

//const key = 'c70750273eb141a68e624dbcfb1317ac'; (min nyckel som fick slut på försök)
const key = '0c357f6746084525bab95fc6a44fce5f';
const h3 = document.getElementById('current-description');
const currentTemp = document.getElementById('current-temp');
const currentWind = document.getElementById('current-wind');
const currentHumidity = document.getElementById('current-humidity');
const weatherimgCurrent = document.getElementById('weatherImgCurrent');


const button = document.querySelector('button');

button.addEventListener('click', function (event) {
    const input = document.querySelector('input');
    let searchText = input.value;
    console.log(searchText);
    const urlcurrent = `https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=${key}&city=${searchText}&lang=sv`;
    const forecasturl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchText}&key=${key}&lang=sv`;

    fetch(urlcurrent).then(
        function (response) {
            console.log(response);

            if (response.status >= 200 && response.status < 300) {

                return response.json();

            }
            else {
                throw 'Something went wrong. :(';
            }
        }
    ).then(
        function (data) {
            const imgicon = data.data[0].weather.icon;
            h3.innerText = 'Vädret i ' + searchText + ' är: ' + data.data[0].weather.description;
            currentTemp.innerText = 'Tempratur ' + Math.round(data.data[0].temp) + '°C';
            currentWind.innerText = 'Vind ' + Math.round(data.data[0].wind_spd) + 'm/s';
            currentHumidity.innerText = 'Luftfuktighet ' + Math.round(data.data[0].rh) + '%';
            weatherimgCurrent.src = `https://www.weatherbit.io/static/img/icons/${imgicon}.png`;
        }
        
        , fetch(forecasturl).then(
            function (response) {
                console.log(response);

                if (response.status >= 200 && response.status < 300) {
                    console.log('successssssss');
                    return response.json();

                }
                else {
                    throw 'Something went wrong. :(';
                }
            }
        ).then(
            function (forecastdata) {
                console.log(forecastdata)
                const forecastTemp = document.getElementsByClassName('forecastTemp');
                forecastTemp[0].innerText = 'Tempratur i Celcius: ' + Math.round(forecastdata.data[1].temp);
                forecastTemp[1].innerText = 'Tempratur i Celcius: ' + Math.round(forecastdata.data[2].temp);
                forecastTemp[2].innerText = 'Tempratur i Celcius: ' + Math.round(forecastdata.data[3].temp);
                forecastTemp[3].innerText = 'Tempratur i Celcius: ' + Math.round(forecastdata.data[4].temp);
                forecastTemp[4].innerText = 'Tempratur i Celcius: ' + Math.round(forecastdata.data[5].temp);
                const forecastp = document.getElementsByClassName('forecastDes');
                forecastp[0].innerText = forecastdata.data[1].weather.description;
                forecastp[1].innerText = forecastdata.data[2].weather.description;
                forecastp[2].innerText = forecastdata.data[3].weather.description;
                forecastp[3].innerText = forecastdata.data[4].weather.description;
                forecastp[4].innerText = forecastdata.data[5].weather.description;
                for (let i = 1; i <= 5; i++) {
                    let forecastimg = forecastdata.data[i].weather.icon;
                    const images = document.querySelectorAll('img');
                    images[i].src = `https://www.weatherbit.io/static/img/icons/${forecastimg}.png`;
                    //forecastp[i].innerText = forecastdata.data[i].weather.description;
                    //forecastTemp[i].innerText = 'Tempratur i Celcius: ' + Math.round(forecastdata.data[i].temp);
                }
            }
        )
    ).catch(
        function (error) {
            console.log('something went wrong');
            const h4 = document.getElementById('error-message');
            const forecastTemp = document.getElementsByClassName('forecastTemp');
            const forecastp = document.getElementsByClassName('forecastDes');
            h4.innerText = 'something went wrong, try again';
            h3.innerText = '';
            currentTemp.innerText = '';
            currentWind.innerText = '';
            currentHumidity.innerText = '';
            forecastTemp[0].innerText = '';
            forecastTemp[1].innerText = '';
            forecastTemp[2].innerText = '';
            forecastTemp[3].innerText = '';
            forecastTemp[4].innerText = '';
            forecastp[0].innerText = '';
            forecastp[1].innerText = '';
            forecastp[2].innerText = '';
            forecastp[3].innerText = '';
            forecastp[4].innerText = '';
        });

    document.getElementById('error-message').innerText = '';

}); //button eventlistener slutar


