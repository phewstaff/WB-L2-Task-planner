import React, { createContext, useEffect, useState } from "react";

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    todoItems: [],
  });

  useEffect(() => {
    const storedState = sessionStorage.getItem("appState");

    if (storedState) {
      setAppState(JSON.parse(storedState));
    }
  }, []);

  useEffect(() => {
    console.log(2);
    sessionStorage.setItem("appState", JSON.stringify(appState));
  }, [appState]);

  const addTodo = (newTodo) => {
    setAppState((prevState) => ({
      ...prevState,
      todoItems: [...prevState.todoItems, newTodo],
    }));
  };

  const deleteAllTodos = () => {
    setAppState((prevState) => ({
      ...prevState,
      todoItems: [],
    }));
  };

  return (
    <AppContext.Provider value={{ appState, addTodo, deleteAllTodos }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
