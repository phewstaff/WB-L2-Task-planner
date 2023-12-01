import { useState, useContext } from "react";
import { AppContext } from "./AppContext";
import "./App.css";

function App() {
  const { appState, addTodo, deleteAllTodos } = useContext(AppContext);

  const [todo, setTodo] = useState({ text: "something" });

  const onSubmit = () => {
    addTodo(todo);
  };

  return (
    <div>
      {appState.todoItems.map((item) => (
        <>{item.text}</>
      ))}

      <button onClick={onSubmit}>add todo</button>
      <button onClick={deleteAllTodos}>Reset</button>
    </div>
  );
}

export default App;
