const mongoose = require("mongoose");

const file = new mongoose.Schema(
  {
    instrumentId: { type: Number, required: true, index: true },
    filename: { type: String, required: true },
  },
  { timestamps: true }
);

const File = mongoose.model("File", file);

module.exports = File;
