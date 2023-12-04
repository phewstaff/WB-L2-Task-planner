import { AppContext } from "./AppContext";
import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import TodoItem from "./components/TodoItem";

function App() {
  const { appState, addTodo, deleteAllTodos } = useContext(AppContext);

  const [todo, setTodo] = useState({ text: "" });
  const [focusedId, setFocusedId] = useState();

  const onSubmit = (e) => {
    const id = uuidv4();
    setTodo({ text: "" });
    addTodo({ id, text: "" });
    setFocusedId(id);
  };

  return (
    <div className="app-container">
      <div className="top">
        <h2>Inbox</h2>
        <button className="addButton" onClick={onSubmit}>
          <span>+</span>
        </button>
      </div>

      {appState.todoItems.map((item) => (
        <TodoItem
          todo={todo}
          setFocusedId={setFocusedId}
          setTodo={setTodo}
          key={item.id}
          item={item}
          focusedId={focusedId}
        />
      ))}

      <button onClick={deleteAllTodos}>Удалить все</button>
    </div>
  );
}

export default App;
