const fs = require("fs");
const chalk = require("chalk");

const log = console.log;

const addNote = (title, body) => {
  debugger;
  const notes = loadNotes();
  const duplicate = notes.find((note) => note.title === title);
  if (!duplicate) {
    notes.push({ title, body });
    saveNotes(notes);
    log(chalk.green(`New note added with title ${title}`));
  } else {
    log(chalk.red.bold.inverse(`Note with title ${title} already exist!`));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const filteredNotes = notes.filter((item) => item.title !== title);
  if (notes.length !== filteredNotes.length) {
    saveNotes(filteredNotes);
    log(chalk.green(`Note removed with title ${title}`));
  } else {
    log(chalk.yellow(`No note found with title ${title} to remove!`));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  if (notes.length) {
    log(chalk.white.bold.inverse("Your notes"));
    notes.forEach((note) => {
      log(note.title);
    });
  } else {
    log(chalk.white.bold.inverse("No notes to display"));
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    log(chalk.white.inverse(note.title));
    log(note.body);
  } else {
    log(chalk.red.bold.inverse(`Note with title ${title} not found!`));
  }
};

const saveNotes = (notes) => {
  const json = JSON.stringify(notes);
  fs.writeFileSync("notes.json", json);
};

const loadNotes = () => {
  try {
    const buffer = fs.readFileSync("notes.json");
    const dataJSON = buffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = { addNote, removeNote, listNotes, readNote };
