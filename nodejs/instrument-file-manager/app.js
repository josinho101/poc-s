const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const File = require("./modals/file");

mongoose
  .connect("mongodb://127.0.0.1:27017/FileStore", {
    useNewUrlParser: true,
  })
  .then(async () => {
    console.log("Connected to database");
    console.time("total-time");

    const fileCount = 1000000;
    const multiplier = 10;
    let files = [];
    const exts = ["jpg", "png", "L01", "001", "txt"];

    await File.deleteMany();

    for (let i = 0; i < multiplier; i++) {
      console.time("Iteration-time");

      for (let i = 0; i < fileCount; i++) {
        const instrumentId = getRandom(1, 5);
        const ext = exts[instrumentId - 1];
        const filename = `${uuidv4()}.${ext}`;
        const file = new File({
          instrumentId,
          filename,
          ext,
          date: Date.now(),
        });
        files.push(file);
        // await file.save();
      }

      console.timeEnd("Iteration-time");

      console.time("Save-time");
      await File.insertMany(files);
      console.timeEnd("Save-time");

      files = [];
    }

    console.timeEnd("total-time");
    console.log("Database save completed!");
  })
  .catch((e) => console.log(e));

const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
