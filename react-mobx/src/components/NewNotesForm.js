import React from "react";
import { useNotesStore } from "../stores/NotesContext";

export const NewNotesForm = () => {
  const [noteText, setNoteText] = React.useState("");
  const notesStore = useNotesStore();

  return (
    <React.Fragment>
      <input
        type="text"
        value={noteText}
        onChange={(e) => {
          setNoteText(e.target.value);
        }}
      />
      <button
        onClick={() => {
          notesStore.addNote(noteText);
        }}
      >
        Submit
      </button>
    </React.Fragment>
  );
};
