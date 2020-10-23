const mongoose = require("mongoose");

const connectToMongoDb = async () => {
  const uri =
    "mongodb+srv://dbuser:Computer1@cluster0.ofpbh.mongodb.net/CLuster0?retryWrites=true&w=majority";
  const options = { useUnifiedTopology: true, useNewUrlParser: true };

  await mongoose.connect(uri, options, (error) => {
    if (error) {
      console.error(`mongo db connection failed with error ${error}`);
    } else {
      console.log("mongodb connection sucessful");
    }
  });
};

module.exports = connectToMongoDb;
