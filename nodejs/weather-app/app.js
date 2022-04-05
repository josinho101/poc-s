const axios = require("axios");

axios.default
  .get(
    "http://api.weatherstack.com/current?access_key=89d0b3895084082f2b278ac64810967a&query=India&units=m"
  )
  .then((res) => {
    const { temperature, feelslike, weather_descriptions } = res.data.current;
    console.log(
      `${weather_descriptions}. It is currently ${temperature} degress out. It feels like ${feelslike} degress out.`
    );
  });
