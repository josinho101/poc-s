const mongoose = require("mongoose");

const file = new mongoose.Schema(
  {
    instrumentId: { type: Number, required: true },
    filename: { type: String, required: true },
    ext: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);
file.index({ instrumentId: 1, ext: 1, date: 1 });

const File = mongoose.model("File", file);

module.exports = File;
