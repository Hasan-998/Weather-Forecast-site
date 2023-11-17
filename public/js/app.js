"use strict";

//Section: DOM Data
const countryName = document.querySelector(".search");
const btn = document.querySelector(".btn-search");
const messageOne = document.querySelector(".message-1");
const messageTwo = document.querySelector(".message-2");

const frontForecast = async function (city) {
  const response = await fetch(
    `http://localhost:3000/weather?address=${encodeURIComponent(city)}`
  );
  const data = await response.json();
  console.log(data);
  const { forecast, "countery-name": location, Error } = data;
  //   console.log(forecast);
  //   console.log(location);
  //   console.log(Error);
  if (!Error) {
    messageTwo.textContent = location;
    messageOne.textContent = forecast;
  } else {
    messageOne.textContent = Error;
  }
};
// frontForecast();

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const address = countryName.value;
  messageOne.textContent = "Loading...🔃";
  frontForecast(address);
});
