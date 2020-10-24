const mongoose = require("mongoose");

const candidateSchema = mongoose.Schema({
  name: String,
  course: String,
});

const CandidateModel = mongoose.model("candidates", candidateSchema);

module.exports = CandidateModel;
