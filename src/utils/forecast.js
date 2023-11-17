"use strict";
//Section: Data Declaration
const weatherStackKey = "2616ee00b678de1e5ed55a32d3ebedac";
const weatherUrl = `http://api.weatherstack.com/current?access_key=${weatherStackKey}&query=33.888630,35.495480`;

//Note: function that gives the current weather forast
const foreCast = async function (latitude, longitude) {
  try {
    ///checking data type
    if (typeof (latitude || longitude) !== "number") {
      console.error("Error, invalid data type");
    } else {
      const response = await fetch(
        `http://api.weatherstack.com/current?access_key=${weatherStackKey}&query=${latitude},${longitude}`
      );

      const data = await response.json();
      if (data.error) console.log("❌ Fail to fetch data,incorrect inputs");
      else {
        const currentData = data.current;
        const overCast = currentData.weather_descriptions[0];
        const str = `${overCast}. It is currently ${currentData.temperature} degree out. There is ${currentData.precip}% to rain.`;
        // console.log(str); // testing
        return str;
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
// foreCast(44.1545, -75.7088);

module.exports = foreCast;
