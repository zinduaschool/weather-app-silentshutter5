const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const apiKey = '323dc501131d72c40ae97b5ce5bda642';

const units = 'etric'; // default to Celsius

let unitToggle = false;


document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('form');

  const locationInput = document.querySelector('#location');

  const loadingDiv = document.querySelector('#loading');

  const weatherDataDiv = document.querySelector('#weather-data');

  const locationNameElement = document.querySelector('#location-name');

  const temperatureElement = document.querySelector('#temperature');

  const conditionsElement = document.querySelector('#conditions');

  const otherDataElement = document.querySelector('#other-data');

  const unitToggleElement = document.querySelector('#unit-toggle');


  form.addEventListener('submit', (e) => {

    e.preventDefault();

    const location = locationInput.value.trim();

    if (location) {

      getWeatherData(location);

    }

  });


  unitToggleElement.addEventListener('click', () => {

    unitToggle =!unitToggle;

    if (unitToggle) {

      units = 'imperial';

    } else {

      units = 'etric';

    }

    getWeatherData(locationInput.value.trim());

  });


  function getWeatherData(location) {

    loadingDiv.style.display = 'block';

    weatherDataDiv.style.display = 'none';


    fetch(`${apiUrl}?q=${location}&units=${units}&appid=${apiKey}`)

     .then(response => response.json())

     .then(data => {

        loadingDiv.style.display = 'none';

        weatherDataDiv.style.display = 'block';


        locationNameElement.textContent = data.name;

        temperatureElement.textContent = `Temperature: ${data.main.temp} ${unitToggle? '°F' : '°C'}`;

        conditionsElement.textContent = `Conditions: ${data.weather[0].description}`;

        otherDataElement.textContent = `Humidity: ${data.main.humidity}%`;

      })

     .catch(error => {

        loadingDiv.style.display = 'none';

        alert(`Error: ${error.message}`);

      });

  }

});