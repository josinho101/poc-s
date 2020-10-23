const express = require("express");
const connectToMongoDb = require("./mongoDbConnector");

const app = express();
const port = 4000;

(async () => {
  await connectToMongoDb();

  app.listen(port, () => {
    console.log(`server started at port ${port}`);
  });
})();
