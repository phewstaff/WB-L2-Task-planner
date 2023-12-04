import React from "react";
import { useContext } from "react";
import { AppContext } from "../AppContext";

const TodoItem = ({ item, focusedId, setFocusedId, todo, setTodo }) => {
  const { updateTodo } = useContext(AppContext);

  const handleOnBlur = () => {
    updateTodo(todo);
  };

  const handleOnChange = (e) => {
    setTodo({ id: item.id, text: e.target.value });
  };

  const handleOnClick = () => {
    setTodo({ text: item.text });
    setFocusedId(item.id);
  };

  return (
    <div key={item.id}>
      <p>{item.id}</p>
      <input
        onClick={handleOnClick}
        autoFocus
        id={item.id}
        value={item.id === focusedId ? todo.text : item.text}
        onChange={handleOnChange}
        onBlurCapture={handleOnBlur}
        type="text"
      />
    </div>
  );
};

export default TodoItem;
