let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let day = days[now.getDay()];
let dates = now.getDate();
let month = months[now.getMonth()];
let currentHours = now.getHours();
let currentMinutes = now.getMinutes();

function formatDate() {
  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = `${day},${month} ${dates}`;
}
formatDate();
function formatTime() {
  let currentTime = document.querySelector("#current-time");
  if (currentMinutes < 10){ currentMinutes = `0${currentMinutes}`};
  if (currentHours < 10){ currentHours = `0${currentHours}`};
  currentTime.innerHTML = `${currentHours}:${currentMinutes}`;
}
formatTime();
//forecast
function displayForecast(){
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecastHTML = forecastHTML + `
    <div class="col-2">
<div id="forecast" class="dateForecast">Thu</div> <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="icon" width="46
"> <span class="tempForecast">18° </span>
</div> `;
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}
//search engine
function currentWeather(response) {
  console.log(response);
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
iconElement.setAttribute(
  "src",
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
);
}
//unit convertor
function changeToFahrenheit(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9 )/ 5+32;
  temperatureElement.innerHTML= Math.round(fahrenheitTemperature);
}
let celsiusTemperature = null;

function changeToCelsius(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML= Math.round(celsiusTemperature);
}
let celsiusUnit = document.querySelector("#celsius");
celsiusUnit.addEventListener("click", changeToCelsius);
let fahrenheitUnit= document.querySelector("#fahrenheit");
fahrenheitUnit.addEventListener("click", changeToFahrenheit);
//current weather
function search(event) {
  let city = document.querySelector("#search-input").value;
  let apiKey = "ca5da085c3334fa2974d520a9a4b8c12";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeather);
}
function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);
displayForecast();
search("Edmonton");


