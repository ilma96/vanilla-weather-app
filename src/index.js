function theDateOfToday(date) {
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentDay = day[date.getDay()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentDay} ${currentHour}:${currentMinutes}`;
}

function displayTemp(response) {
  document.querySelector("#modifiedCity").innerHTML = response.data.name;
  document.querySelector("#modified-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#winds").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-state").innerHTML =
    response.data.weather[0].main;
}

function formWithCity(cityEntered) {
  let unit = "metric";
  let apiKey = "b6d0f48d8b8d9ccceaeb0e9770f0b375";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityEntered}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayTemp);
}
function cityGenerator(event) {
  event.preventDefault();
  let cityEntered = document.querySelector("#city-selection").value;
  formWithCity(cityEntered);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentCity);
}
function currentCity(location) {
  let apiKey = "b6d0f48d8b8d9ccceaeb0e9770f0b375";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}
let now = new Date();
let listOfDates = document.querySelector("#day-time");
listOfDates.innerHTML = theDateOfToday(now);

let searchForCity = document.querySelector("#search-form");
searchForCity.addEventListener("submit", cityGenerator);
formWithCity("Lisbon");
let currentPosition = document.querySelector("#current-location");
currentPosition.addEventListener("click", currentLocation);
