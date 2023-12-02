import { AppContext } from "./AppContext";
import { useState, useContext, useId, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";

function App() {
  const { appState, addTodo, updateTodo, deleteAllTodos } =
    useContext(AppContext);

  const [todo, setTodo] = useState({ text: "" });
  const [focusedId, setFocusedId] = useState();
  console.log(todo.text);

  const onSubmit = () => {
    const id = uuidv4();
    setTodo("");
    addTodo({ ...todo, id, text: "" });
    setFocusedId(id);
  };

  const handleOnBlur = () => {
    setFocusedId(null);
    updateTodo(todo);
  };

  return (
    <div>
      {appState.todoItems.map((item) => (
        <div key={item.id}>
          <h1>{item.text}</h1>
          <input
            defaultValue=""
            autoFocus
            disabled={item.id !== focusedId}
            id={item.id}
            value={item.id === focusedId ? todo.text : item.text}
            onChange={(e) => {
              setTodo({ id: item.id, text: e.target.value });
            }}
            onBlurCapture={handleOnBlur}
            type="text"
            name=""
          />
        </div>
      ))}

      <button onClick={deleteAllTodos}>Reset</button>

      <button onClick={onSubmit}>+</button>
    </div>
  );
}

export default App;
