const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather Home",
    name: "Weather app",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    message:
      "This is a sample message. If you need a real help contact adminstrator!!",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forcast: "It's sunny",
    location: "India",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help page",
    error: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Not found!",
    error: "Page you are looking for dosen't exist",
  });
});

app.listen(3000, () => console.info("Server is up on port 3000."));
