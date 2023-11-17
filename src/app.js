"use strict";
/**app.use(express.static(html path directory))
 * app.get('page name', (request,response)=>{ respose.send({html tags} OR JSON objects)})
 * app.listen(port nb, (fn)=>{})
 */

//app.js/about
//app.js/help
//app.js/weather

//Section: Data Initalization
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const foreCast = require("./utils/forecast");
const GeoLocationInfo = require("./utils/geoLocation");
const { error } = require("console");

const app = express();

//Section: App Coding

///Define path for express configuration
const pathDirectory = path.join(__dirname, "../public");
const viewPathDirectory = path.join(__dirname, "../templates/views");
const parialPathDirectory = path.join(__dirname, "../templates/partials");

///Setup handlebar engune and view location
app.set("view engine", "hbs");
app.set("views", viewPathDirectory);
hbs.registerPartials(parialPathDirectory);

///Setup static directory to serve
app.use(express.static(pathDirectory));

///Home page
app.get("", (req, res) => {
  res.render("index", {
    title: "ForeCase App",
    name: "Hasan",
  });
});

///Help page
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    paragraph:
      "Helping others is not always about financially supporting them. At some time it's about giving them an extra hand while they are struggling with something. ",
  });
});

///About page
app.get("/about", (req, res) => {
  res.render("about", {
    name: "Hasan Hamzeh",
    title: "About Me",
    Email: "hasanhamzeh2017@gmail.com",
  });
});

///Weather page
app.get("/weather", async (request, response) => {
  if (!request.query.address) {
    response.send({
      Error: "⛔ Please provide an address to search for",
    });
  } else {
    const address = request.query.address;
    const foreCastStr = await GeoLocationInfo(address);

    response.send({
      forecast: foreCastStr,
      "countery-name": address,
    });
  }
});

///Product page
app.get("/product", (req, res) => {
  if (!req.query.search) {
    res.send({
      "Error-Message": "Please provide a search query",
    });
  } else {
    console.log(req.query.search);
    res.send({
      Products: [],
    });
  }
});

///Help page error
app.get("/help/*", (request, response) => {
  response.render("Error", {
    title: "404",
    errorMessage: "Help article is not found",
  });
});

///Error page
app.get("*", (request, response) => {
  response.render("Error", {
    name: "Hasan",
    title: "404",
    errorMessage: "Page Not Found",
  });
});

///to run the server at port 3000 localhost
app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
