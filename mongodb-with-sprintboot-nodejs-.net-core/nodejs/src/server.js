const express = require("express");
const connectToMongoDb = require("./mongoDbConnector");
const writeCandidatesToDb = require("./candidatesrepository");
const CandidateModel = require("./candidateschema");

const app = express();
const port = 4000;

(async () => {
  await connectToMongoDb().then(() => {
    console.log("mongodb connection successful");
    writeCandidatesToDb();
  });

  app.get("/api/v1/candidates", (req, res) => {
    const candidates = CandidateModel.find({}, "-_class", (err, candidates) => {
      res.send(candidates);
    });
  });

  app.listen(port, () => {
    console.log(`server started at port ${port}`);
  });
})();
