"use strict";
const foreCast = require("./forecast");

// Section: Data Declaration
const positionStackKey = "e21af3becbff9b4d24d437055aa7fe87";
const positionUrl = `http://api.positionstack.com/v1/forward?access_key=${positionStackKey}&query=beirut`;

//Section: App Data
//Note: function that accept the name of country and gives the lat & long data
const GeoLocationInfo = async function (query) {
  try {
    const response = await fetch(
      `http://api.positionstack.com/v1/forward?access_key=${positionStackKey}&query=${encodeURI(
        query
      )}`
    );
    const data = await response.json();
    const proccessedData = data.data;
    if (proccessedData === undefined || proccessedData.length === 0)
      return "❌ Invalid country search";
    else {
      const { latitude, longitude, name } = proccessedData[0];
      console.log("latitude:", latitude);
      console.log("longtitude", longitude);
      console.log("Country_name:", name);
      ///calling the second function and awaiting the response to get the data
      const forecastStr = await foreCast(latitude, longitude);
      console.log(forecastStr);
      return forecastStr;
    }
  } catch (err) {
    console.log(err.message);
  }
};
// GeoLocationInfo("usa");

module.exports = GeoLocationInfo;
