import { AppContext } from "./AppContext";
import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import TodoItem from "./components/TodoItem";

function App() {
  const { appState, addTodo, deleteAllTodos } = useContext(AppContext);

  const [todo, setTodo] = useState({});
  const [focusedId, setFocusedId] = useState();

  const onSubmit = (e) => {
    const id = uuidv4();
    setTodo({ text: "New task", note: "", date: "", time: "" });
    addTodo({ id, text: "New task", note: "", date: "", time: "" });
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
      </div>

      {appState.todoItems.map((item) => (
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
