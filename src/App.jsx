import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { AppContext } from "./AppContext";
import TodoItem from "./components/TodoItem";
import { useSortTodos } from "./hooks/todoSort";

import "./App.css";

function App() {
  const { appState, addTodo, deleteAllTodos } = useContext(AppContext);
  const [todo, setTodo] = useState({});
  const [focusedId, setFocusedId] = useState();

  const { sortedTodos, toggleSortBy } = useSortTodos(appState.todoItems);

  const onSubmit = (e) => {
    const id = uuidv4();
    setTodo({
      text: "New task",
      note: "",
      date: "",
      time: "",
      completed: false,
    });
    addTodo({
      id,
      text: "New task",
      note: "",
      date: "",
      time: "",
      completed: false,
    });
    setFocusedId(id);
  };

  useEffect(() => {
    if ("Notification" in window) {
      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      }
    }

    return;
  }, []);

  return (
    <div className="app-container">
      <div className="top">
        <h2>Inbox</h2>
        <button className="addButton" onClick={onSubmit}>
          <span>+</span>
        </button>
        <button onClick={() => toggleSortBy("completion")}>
          <span>Sort:Completed</span>
        </button>
        <button onClick={() => toggleSortBy("date")}>
          <span>Sort:Date</span>
        </button>
      </div>

      {sortedTodos.map((item) => (
        <div key={item.id}>
          <TodoItem
            todo={todo}
            setFocusedId={setFocusedId}
            setTodo={setTodo}
            key={item.id}
            item={item}
            focusedId={focusedId}
          />

          <hr />
        </div>
      ))}

      <button onClick={deleteAllTodos}>
        <h2>Delete all</h2>
      </button>
    </div>
  );
}

export default App;
