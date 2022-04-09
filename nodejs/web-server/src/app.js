const path = require("path");
const express = require("express");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates"));

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather app Index",
    name: "Kungfu panda",
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/help", (req, res) => {
  res.render("help", {
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

app.listen(3000, () => console.info("Server is up on port 3000."));
