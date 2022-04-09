const { forcast } = require("./utils/forcast");

const location = process.argv[2];

if (!location) {
  console.log("Please provide a location");
} else {
  forcast(location, (error, data) => {
    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
  });
}
