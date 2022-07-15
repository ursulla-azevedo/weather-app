// DISPLAY DATE
let currentDate = new Date();
console.log(currentDate);

let day = currentDate.getDate();
let hours = currentDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
if (hours < 5 && hours > 19) {
  let body = document.querySelector("body");
  body.setAttribute("class", "evening");
} else if (hours >= 5 && hours < 13) {
  let body = document.querySelector("body");
  body.setAttribute("class", "morning");
} else {
  let body = document.querySelector("body");
  body.setAttribute("class", "afternoon");
}

let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let year = currentDate.getFullYear();

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekDay = weekDays[currentDate.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[currentDate.getMonth()];

let dateToday = document.querySelector("#dateToday");

dateToday.innerHTML = `<strong>${weekDay}</strong> <br /> ${month} ${day}, ${year} | ${hours}:${minutes}`;

// SEARCH ENGINE

function showTemperature(response) {
  console.log(response);

  let cityName = document.querySelector("h2");
  let city = response.data.name;
  let country = response.data.sys.country;
  cityName.innerHTML = `${city}, ${country}`;

  let tempNow = Math.round(response.data.main.temp);
  let tempMax = Math.round(response.data.main.temp_max);
  let tempMin = Math.round(response.data.main.temp_min);

  let temp = document.querySelector(".tempNow");
  temp.innerHTML = tempNow;

  let tempMaxPage = document.querySelector(
    ".current-temperature.highest-temperature-number"
  );
  tempMaxPage.innerHTML = `${tempMax}°C`;

  let tempMinPage = document.querySelector(
    ".current-temperature.lowest-temperature-number"
  );
  tempMinPage.innerHTML = `${tempMin}°C`;

  let status = response.data.weather[0].description;
  let statusPage = document.querySelector(".weather-status");
  statusPage.innerHTML = status;

  /*
  let rain = Math.round(response.precipitation.value);
  let rainPage = document.querySelector(".extra-rain");
  rainPage.innerHTML = `Rain: ${rain}mm`;
  */

  let wind = Math.round(response.data.wind.speed);
  let windPage = document.querySelector(".extra-wind");
  windPage.innerHTML = `Wind: ${wind} m/s`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityPage = document.querySelector(".extra-humidity");
  humidityPage.innerHTML = `Humidity: ${humidity}%`;
}

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");

  let apiKey = "b53f6bd5a46cab6958ad3d105cf50f94";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

let searchBar = document.querySelector("form");
searchBar.addEventListener("submit", searchCity);

// CALL FOR DEFAULT LOCATION

let apiKey = "b53f6bd5a46cab6958ad3d105cf50f94";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lisbon&units=metric&appid=${apiKey}`;

axios.get(apiUrl).then(showTemperature);

// GEOLOCATION

function showLocalWeather(response) {
  console.log(response);

  let cityName = document.querySelector("h2");
  let city = response.data.name;
  let country = response.data.sys.country;
  cityName.innerHTML = `${city}, ${country}`;

  let tempNow = Math.round(response.data.main.temp);
  let tempMax = Math.round(response.data.main.temp_max);
  let tempMin = Math.round(response.data.main.temp_min);

  let temp = document.querySelector(".tempNow");
  temp.innerHTML = tempNow;

  let tempMaxPage = document.querySelector(
    ".current-temperature.highest-temperature-number"
  );
  tempMaxPage.innerHTML = `${tempMax}°C`;

  let tempMinPage = document.querySelector(
    ".current-temperature.lowest-temperature-number"
  );
  tempMinPage.innerHTML = `${tempMin}°C`;

  let status = response.data.weather[0].main;
  let statusPage = document.querySelector(".weather-status");
  statusPage.innerHTML = status;

  /*
  let rain = Math.round(response.precipitation.value);
  let rainPage = document.querySelector(".extra-rain");
  rainPage.innerHTML = `Rain: ${rain}mm`;
  */

  let wind = Math.round(response.data.wind.speed);
  let windPage = document.querySelector(".extra-wind");
  windPage.innerHTML = `Wind: ${wind} m/s`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityPage = document.querySelector(".extra-humidity");
  humidityPage.innerHTML = `Humidity: ${humidity}%`;
}

function showLocalPosition(response) {
  let lat = Math.round(response.coords.latitude);
  let lon = Math.round(response.coords.longitude);

  let apiKey = "b53f6bd5a46cab6958ad3d105cf50f94";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showLocalWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocalPosition);
}

let buttonLocation = document.querySelector(".current-location");
buttonLocation.addEventListener("click", getCurrentPosition);

// CELSIUS TO FAHRENHEIT
/*
function changeToFahrenheit() {
  let mainTemp = document.querySelector(".mainTemp.tempUnit");
  mainTemp.innerHTML = `<a href="#" class="fUnit notClickable" id="fUnit">°F</a> |
                <a href="#" class="cUnit clickable" id="cUnit">°C</a>`;

  let tempNow = document.querySelector(".tempNow");
  tempNow.innerHTML = "64";

  let highestTemperatureNow = document.querySelector(
    ".current-temperature.highest-temperature-number"
  );
  highestTemperatureNow.innerHTML = `<span class="highest-temperature-number current-temperature">
                71°F</span
              >`;

  let lowestTemperatureNow = document.querySelector(
    ".current-temperature.lowest-temperature-number"
  );
  lowestTemperatureNow.innerHTML = `<span class="lowest-temperature-number current-temperature">62°F</span>`;

  let cUnit = document.querySelector("#cUnit");
  cUnit.addEventListener("click", changeToCelsius);
}

function changeToCelsius() {
  let mainTemp = document.querySelector(".mainTemp.tempUnit");
  mainTemp.innerHTML = `<a href="#" class="cUnit notClickable" id="cUnit">°C</a> |
                <a href="#" class="fUnit clickable" id="fUnit">°F</a>`;

  let tempNow = document.querySelector(".tempNow");
  tempNow.innerHTML = "18";

  let highestTemperatureNow = document.querySelector(
    ".current-temperature.highest-temperature-number"
  );
  highestTemperatureNow.innerHTML = `<span class="highest-temperature-number current-temperature">
                22°C</span
              >`;

  let lowestTemperatureNow = document.querySelector(
    ".current-temperature.lowest-temperature-number"
  );
  lowestTemperatureNow.innerHTML = `<span class="lowest-temperature-number current-temperature">17°C</span>`;

  let fUnit = document.querySelector("#fUnit");
  fUnit.addEventListener("click", changeToFahrenheit);
}

let fUnit = document.querySelector("#fUnit");
fUnit.addEventListener("click", changeToFahrenheit);

let cUnit = document.querySelector("#cUnit");
cUnit.addEventListener("click", changeToCelsius);
*/
