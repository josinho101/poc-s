const chalk = require("chalk");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { getNotes } = require("./notes");

yargs(hideBin(process.argv))
  .command({
    command: "add",
    describe: "Adds a new note",
    builder: {
      title: {
        describe: "Note title",
        demandOption: true,
        type: "string",
      },
      body: {
        describe: "Note body",
        demandOption: true,
        type: "string",
      },
    },
    handler: function (argv) {
      console.log(`Title: ${argv.title}, Body: ${argv.body}`);
    },
  })
  .command({
    command: "remove",
    describe: "Remove a note",
    handler: function () {
      console.log("Removing a note");
    },
  })
  .command({
    command: "list",
    describe: "List all notes",
    handler: function () {
      console.log("Listing notes");
    },
  })
  .command({
    command: "read",
    describe: "Reading a note",
    handler: function () {
      console.log("Reading a note");
    },
  })
  .parse();
