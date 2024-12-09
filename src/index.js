function search(city) {
  let apiKey = `57b366cc3c6f14127edbbo64a0t02b0a`;
  let unit = `metric`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayRefreash);
}

function cityInput(event) {
  event.preventDefault();
  let searchBox = document.querySelector("#input-city-input-box");
  let city = document.querySelector("#current-city");
  let currentCity = searchBox.value;
  search(currentCity);
}

function displayRefreash(responce) {
  let cityDisplay = document.querySelector("#current-city");
  let currentCity = responce.data.city;
  let currentTemperature = Math.round(responce.data.temperature.current);
  let temperatureElement = document.querySelector("#current-temperature");
  let iconElement = document.querySelector("#temperature-icon");
  let dateElement = document.querySelector("#time");
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");

  cityDisplay.innerHTML = currentCity;
  temperatureElement.innerHTML = currentTemperature;
  iconElement.innerHTML = `<img src="${responce.data.condition.icon_url}" class="weather-app-icon" />`;
  conditionElement.innerHTML = responce.data.condition.description;
  humidityElement.innerHTML = responce.data.temperature.humidity;
  windElement.innerHTML = `${responce.data.wind.speed}km/h`;

  let currentDate = new Date(responce.data.time * 1000);

  dateElement.innerHTML = dateFormat(currentDate);
}
function dateFormat(date) {
  let now = date;
  let hour = now.getHours().toString().padStart(2, "0");
  let min = now.getMinutes().toString().padStart(2, "0");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day} ${hour}:${min}`;
}

function displayForecast() {
  let days = ["Tomorrow", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${day}</div>
            <div class="weather-forecast-icon">🌦</div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>12°C</strong>
              </div>
              <div class="weather-forecast-temperature">5°C</div>
            </div>
          </div>`;
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

let formInput = document.querySelector("#input-city-form");
formInput.addEventListener("submit", cityInput);

search("London");
displayForecast();
