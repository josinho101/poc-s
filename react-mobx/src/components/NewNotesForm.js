import React from "react";
import { useStore } from "../stores/StoreContext";

export const NewNotesForm = () => {
  const [noteText, setNoteText] = React.useState("");
  const { notesStore } = useStore();

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
          setNoteText("");
        }}
      >
        Add note
      </button>
    </React.Fragment>
  );
};
