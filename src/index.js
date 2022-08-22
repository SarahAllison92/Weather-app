//Time section

let now = new Date();
function formatDate(dates) {
  let hours = dates.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = dates.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = dates.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesdsay",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[dayIndex];

  return `${day}, ${date} ${month} ${year} <br /> ${hours}:${minutes}`;
}

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

let date = now.getDate();
let month = months[now.getMonth()];
let year = now.getFullYear();

let displayDate = document.querySelector("#date");
displayDate.innerHTML = formatDate(now);

//Search Bar, API

function currentConditions(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#conditions").innerHTML =
    response.data.weather[0].description;
}

function search(city) {
  let apiKey = "ebc2487298b0e7c6cfcfbfe23bd11495";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentConditions);
}

function cityInput(event) {
  event.preventDefault();
  let city = document.querySelector("#text-input").value;
  search(city);
}

function currentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  let apiKey = "ebc2487298b0e7c6cfcfbfe23bd11495";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentConditions);
}

function currentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let form = document.querySelector("#search-bar");
form.addEventListener("submit", cityInput);

let button = document.querySelector("button");
button.addEventListener("click", currentCity);

search("Glasgow");
