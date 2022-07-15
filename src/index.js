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

  celsiusTemp = Math.round(response.data.main.temp);

  tempMax = Math.round(response.data.main.temp_max);
  tempMin = Math.round(response.data.main.temp_min);

  let temp = document.querySelector(".tempNow");
  temp.innerHTML = celsiusTemp;

  let tempMaxPage = document.querySelector(
    ".current-temperature.highest-temperature-number"
  );
  tempMaxPage.innerHTML = `${tempMax}`;

  let tempMinPage = document.querySelector(
    ".current-temperature.lowest-temperature-number"
  );
  tempMinPage.innerHTML = `${tempMin}`;

  let status = response.data.weather[0].description;
  let statusPage = document.querySelector(".weather-status");
  statusPage.innerHTML = status;

  let wind = Math.round(response.data.wind.speed);
  let windPage = document.querySelector(".extra-wind");
  windPage.innerHTML = `Wind: ${wind} m/s`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityPage = document.querySelector(".extra-humidity");
  humidityPage.innerHTML = `Humidity: ${humidity}%`;

  // IMAGES

  function displayIcon() {
    let weatherTodayImg = document.querySelector(".current-weather-image");
    let weatherImg = response.data.weather[0].icon;

    if (weatherImg === "01d") {
      weatherTodayImg.src = "media/weather-elements_Sun.svg";
    } else if (weatherImg === "01n") {
      weatherTodayImg.src = "media/weather-elements_Moon.svg";
    } else if (weatherImg === "01n") {
      weatherTodayImg.src = "media/weather-elements_Moon.svg";
    } else if (weatherImg === "02d") {
      weatherTodayImg.src = "media/weather-elements_Sun-clouds.svg";
    } else if (weatherImg === "02n") {
      weatherTodayImg.src = "media/weather-elements_Moon-clouds.svg";
    } else if (weatherImg === "03d" || weatherImg === "03n") {
      weatherTodayImg.src = "media/weather-elements_Clouds.svg";
    } else if (weatherImg === "04d" || weatherImg === "04n") {
      weatherTodayImg.src = "media/weather-elements_Clouds-more.svg";
    } else if (
      weatherImg === "09d" ||
      weatherImg === "09n" ||
      weatherImg === "10n" ||
      weatherImg === "10n"
    ) {
      weatherTodayImg.src = "media/weather-elements_Rain.svg";
    } else if (weatherImg === "11d" || weatherImg === "11n") {
      weatherTodayImg.src = "media/weather-elements_Storm.svg";
    } else if (weatherImg === "13d" || weatherImg === "13n") {
      weatherTodayImg.src = "media/weather-elements_Snow.svg";
    } else if (weatherImg === "50d" || weatherImg === "50n") {
      weatherTodayImg.src = "media/weather-elements_Wind.svg";
    }
  }

  displayIcon();

  changeToCelsius();
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
  let cityName = document.querySelector("h2");
  let city = response.data.name;
  let country = response.data.sys.country;
  cityName.innerHTML = `${city}, ${country}`;

  celsiusTemp = Math.round(response.data.main.temp);

  let tempMax = Math.round(response.data.main.temp_max);
  let tempMin = Math.round(response.data.main.temp_min);

  let temp = document.querySelector(".tempNow");
  temp.innerHTML = celsiusTemp;

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

  let wind = Math.round(response.data.wind.speed);
  let windPage = document.querySelector(".extra-wind");
  windPage.innerHTML = `Wind: ${wind} m/s`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityPage = document.querySelector(".extra-humidity");
  humidityPage.innerHTML = `Humidity: ${humidity}%`;

  changeToCelsius();
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

function changeToFahrenheit() {
  let mainTemp = document.querySelector(".mainTemp.tempUnit");
  mainTemp.innerHTML = `<a href="#" class="fUnit notClickable" id="fUnit">°F</a> |
                <a href="#" class="cUnit clickable" id="cUnit">°C</a>`;

  let celsiusTemp = document.querySelector(".tempNow");
  let fahrenheitTemp = Math.round((celsiusTemp.innerHTML * 9) / 5 + 32);
  celsiusTemp.innerHTML = fahrenheitTemp;

  let highestTemperatureNow = document.querySelector("#highestToday");

  let highestTodayF = Math.round(
    (highestTemperatureNow.innerHTML * 9) / 5 + 32
  );
  highestTemperatureNow.innerHTML = highestTodayF;

  let lowestTemperatureNow = document.querySelector(
    ".current-temperature.lowest-temperature-number"
  );

  let lowestTodayF = Math.round((lowestTemperatureNow.innerHTML * 9) / 5 + 32);
  lowestTemperatureNow.innerHTML = lowestTodayF;

  let unit1 = document.querySelector(".unit1");
  unit1.innerHTML = "°F";

  let unit2 = document.querySelector(".unit2");
  unit2.innerHTML = "°F";

  let cUnit = document.querySelector("#cUnit");
  cUnit.addEventListener("click", changeToCelsius);
}

function changeToCelsius() {
  let mainTemp = document.querySelector(".mainTemp.tempUnit");
  mainTemp.innerHTML = `<a href="#" class="cUnit notClickable" id="cUnit">°C</a> |
                <a href="#" class="fUnit clickable" id="fUnit">°F</a>`;

  let tempNow = document.querySelector(".tempNow");
  tempNow.innerHTML = celsiusTemp;

  let highestTemperatureNow = document.querySelector(
    ".current-temperature.highest-temperature-number"
  );
  highestTemperatureNow.innerHTML = tempMax;

  let lowestTemperatureNow = document.querySelector(
    ".current-temperature.lowest-temperature-number"
  );
  lowestTemperatureNow.innerHTML = tempMin;

  let unit1 = document.querySelector(".unit1");
  unit1.innerHTML = "°C";

  let unit2 = document.querySelector(".unit2");
  unit2.innerHTML = "°C";

  let fUnit = document.querySelector("#fUnit");
  fUnit.addEventListener("click", changeToFahrenheit);
}

let celsiusTemp = null;
let tempMax = null;
let tempMin = null;

let fUnit = document.querySelector("#fUnit");
fUnit.addEventListener("click", changeToFahrenheit);

let cUnit = document.querySelector("#cUnit");
cUnit.addEventListener("click", changeToCelsius);
