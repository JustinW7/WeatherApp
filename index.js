const apikeyS="e80d21cb9ccd7a42aa093b0105abe619";

const weatherDataEl=document.getElementById("weather-data");

const cityEl=document.getElementById("city-input");

const formEl=document.querySelector("form");

formEl.addEventListener("submit",(event) => {
  event.preventDefault();
  const cityValue=cityEl.value;
  getWeatherData(cityValue);
  
});


async function getWeatherData(cityValue) {
  try {
const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikeyS}&units=metric`);

if(!response.ok) {
  throw new Error("Network Error");
  }
const data =await response.json();
const temperature=Math.round(data.main.temp)
const description = data.weather[0].description;
const icon=data.weather[0].icon;
const details=[
  `Feels like:${Math.round(data.main.feels_like)}`,
  `Humidity:${data.main.humidity}%`,
  
];
weatherDataEl.querySelector(".icon").innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;

weatherDataEl.querySelector(
  ".temperature"
).textContent=`${temperature}°C`;
weatherDataEl.querySelector(".description").textContent=description;

weatherDataEl.querySelector(".details").innerHTML=details.map((detail)=> `<div>${detail}</div>`)

.join("");
  }catch (error){
    weatherDataEl.querySelector(".icon").innerHTML="";
    weatherDataEl.querySelector(".temperature").textContent=
    "";
    weatherDataEl.querySelector(".description").textContent="An error occured";
    weatherDataEl.querySelector(".details").innerHTML = "";
}
}