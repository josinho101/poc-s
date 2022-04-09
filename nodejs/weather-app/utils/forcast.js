const axios = require("axios");

const forcast = (location, callback) => {
  axios.default
    .get(
      `http://api.weatherstack.com/current?access_key=89d0b3895084082f2b278ac64810967a&query=${location}&units=m`
    )
    .then((res) => {
      if (res.data.error) {
        callback("No data available!");
      } else {
        const { temperature, feelslike, weather_descriptions } =
          res.data.current;
        callback(
          undefined,
          `${weather_descriptions}. It is currently ${temperature} degress out. It feels like ${feelslike} degress out.`
        );
      }
    })
    .catch((error) => callback("Something gone bad!!" + error));
};

module.exports = { forcast };
