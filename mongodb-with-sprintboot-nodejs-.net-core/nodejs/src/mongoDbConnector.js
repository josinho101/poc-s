const mongoose = require("mongoose");

const connectToMongoDb = async () => {
  const uri =
    "mongodb+srv://dbuser:Computer1@cluster0.ofpbh.mongodb.net/CandidatesDB?retryWrites=true&w=majority";
  const options = { useUnifiedTopology: true, useNewUrlParser: true };

  const promise = mongoose.connect(uri, options);

  return promise;
};

module.exports = connectToMongoDb;
