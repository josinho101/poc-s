import "./App.css";
import React from "react";
import { NewNotesForm } from "./components/NewNotesForm";
import { useNotesStore } from "./stores/NotesContext";
import { useObserver } from "mobx-react";
import { toJS } from "mobx";

const App = () => {
  const notesStore = useNotesStore();
  const notes = toJS(notesStore.notes);

  return useObserver(() => (
    <React.Fragment>
      <ui>
        {notesStore.notes.map((note) => (
          <li>{note.text}</li>
        ))}
      </ui>
      <NewNotesForm />
    </React.Fragment>
  ));
};

export default App;
