const chalk = require("chalk");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { readNote, addNote, removeNote, listNotes } = require("./notes");

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
    handler(argv) {
      addNote(argv.title, argv.body);
    },
  })
  .command({
    command: "remove",
    describe: "Remove a note",
    builder: {
      title: {
        describe: "Note title",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      removeNote(argv.title);
    },
  })
  .command({
    command: "list",
    describe: "List all notes",
    handler() {
      listNotes();
    },
  })
  .command({
    command: "read",
    describe: "Reading a note",
    builder: {
      title: {
        describe: "Note title",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      readNote(argv.title);
    },
  })
  .parse();
