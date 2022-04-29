const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const File = require("./modals/file");

mongoose
  .connect("mongodb://127.0.0.1:27017/InstrumentFileManager", {
    useNewUrlParser: true,
  })
  .then(async () => {
    console.log("Connected to database");
    console.time("total-time");

    const fileCount = 100;
    const files = [];
    const exts = ["jpg", "png", "L01", "001", "txt"];

    await File.deleteMany();

    console.time("Iteration-time");

    for (let i = 0; i < fileCount; i++) {
      const instrumentId = getRandom(1, 5);
      const filename = `${uuidv4()}.${exts[instrumentId - 1]}`;
      const file = new File({ instrumentId, filename });
      files.push(file);
    }

    console.timeEnd("Iteration-time");

    console.time("Save-time");
    await File.insertMany(files);
    console.timeEnd("Save-time");

    console.timeEnd("total-time");
    console.log("Database save completed!");
  })
  .catch((e) => console.log(e));

const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
