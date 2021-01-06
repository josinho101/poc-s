import { nanoid } from "nanoid";

export const createNotesStore = () => {
  return {
    notes: [],
    addNote(text) {
      this.notes.push({
        id: nanoid(),
        text: text,
      });
    },
    removeNote(id) {
      this.notes = this.notes.filter((note) => note.id !== id);
    },
  };
};
