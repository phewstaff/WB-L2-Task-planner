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
    sessionStorage.setItem("appState", JSON.stringify(appState));
  }, [appState]);

  const addTodo = (newTodo) => {
    setAppState((prevState) => ({
      ...prevState,
      todoItems: [...prevState.todoItems, newTodo],
    }));
  };

  const updateTodo = (updatedTodo) => {
    setAppState((prevState) => ({
      ...prevState,
      todoItems: prevState.todoItems.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      ),
    }));
  };

  const deleteTodo = (id) => {
    setAppState((prevState) => ({
      ...prevState,
      todoItems: prevState.todoItems.filter((todo) => todo.id !== id),
    }));
  };

  const deleteAllTodos = () => {
    setAppState((prevState) => ({
      ...prevState,
      todoItems: [],
    }));
  };

  return (
    <AppContext.Provider
      value={{ appState, addTodo, updateTodo, deleteAllTodos, deleteTodo }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
