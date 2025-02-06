const apiKey = "";

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');

const cityName = document.querySelector('#city-name');
const cityCountry = document.querySelector('#city-country');
const weatherImage = document.querySelector('#weather-img');
const degreesTitle = document.querySelector('#degrees-title');
const weatherDescription = document.querySelector('#weather-description');
const maxTemp = document.querySelector('#max-temp');
const minTemp = document.querySelector('#min-temp');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');

const weatherInformationContainer = document.querySelector('.weather-information-container');
const errorElement = document.querySelector('.error');


async function getWeatherData(city) {
    const weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_BR`;

    const response = await fetch(weatherApiURL);
    const weatherData = await response.json();

    return weatherData;
}

async function showWeatherData (city) {
    hideInformations();

    const weatherData = await getWeatherData(city);

    if (weatherData.cod === '404' || weatherData.cod === '400') {
        showError();
        return;
    }

    weatherInformationContainer.classList.remove('hide');

    cityName.innerText = weatherData.name + ' - ';
    cityCountry.setAttribute('src', `https://countryflagsapi.netlify.app/flag/${weatherData.sys.country}.svg`);
    weatherImage.setAttribute('src', `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`);
    degreesTitle.innerText = Math.floor(weatherData.main.temp) + ' C°';
    weatherDescription.innerText = weatherData.weather[0].description;
    maxTemp.innerText = Math.floor(weatherData.main.temp_max) + ' C°';
    minTemp.innerText = Math.floor(weatherData.main.temp_min) + ' C°';
    humidity.innerText = weatherData.main.humidity + '%';
    windSpeed.innerText = weatherData.wind.speed + ' km/h';
}

function hideInformations () {
    weatherInformationContainer.classList.add('hide');
    errorElement.classList.add('hide');
}

function showError () {
    weatherInformationContainer.classList.add('hide');
    errorElement.classList.remove('hide');
}

searchButton.addEventListener('click', () => {
    const citySearched = searchInput.value;

    showWeatherData(citySearched);
    searchInput.value = '';
});
