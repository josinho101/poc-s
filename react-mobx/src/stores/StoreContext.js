import React from "react";
import { useLocalObservable } from "mobx-react";
import { createNotesStore } from "./notesStore";
import { createUsersStore } from "./usersStore";

const StoreContext = React.createContext(null);

export const StoreProvider = ({ children }) => {
  const value = {
    notesStore: useLocalObservable(createNotesStore),
    usersStore: useLocalObservable(createUsersStore),
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => React.useContext(StoreContext);
