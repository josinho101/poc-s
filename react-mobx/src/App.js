import "./App.css";
import React, { useEffect } from "react";
import { NewNotesForm } from "./components/NewNotesForm";
import { useStore } from "./stores/StoreContext";
import { Observer } from "mobx-react";

const App = () => {
  const { notesStore } = useStore();
  const { usersStore } = useStore();

  useEffect(() => {
    usersStore.getUsers();
  });

  return (
    <Observer>
      {() => (
        <div style={{ margin: "10px" }}>
          <h3>Notes</h3>
          <NewNotesForm />
          <ul>
            {notesStore.notes.map((note) => (
              <li key={note.id}>{note.text}</li>
            ))}
          </ul>
          <h3>Users</h3>
          <ul>
            {usersStore.users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      )}
    </Observer>
  );
};

export default App;
