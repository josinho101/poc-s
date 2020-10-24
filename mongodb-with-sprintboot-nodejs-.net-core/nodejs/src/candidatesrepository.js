const fs = require("fs");
const CandidateModel = require("./candidateschema");

const writeCandidatesToDb = () => {
  let data = fs.readFileSync("./data/candidates.json");
  let candidates = JSON.parse(data);

  CandidateModel.find((err, documents) => {
    if (documents.length) {
      console.log("candidates already in db");
    } else {
      console.log("candidates not found");
      candidates.forEach((element, index) => {
        const candidate = new CandidateModel({
          name: element.name,
          course: element.course,
        });

        candidate.save();
      });

      console.log("candidates added to database");
    }
  });

  // console.log("Candidates added to database");
};

module.exports = writeCandidatesToDb;
