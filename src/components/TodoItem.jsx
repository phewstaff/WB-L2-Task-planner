import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../AppContext";

const TodoItem = ({ item, focusedId, setFocusedId, todo, setTodo }) => {
  const [isActive, setIsActive] = useState(false);
  const { updateTodo } = useContext(AppContext);

  const handleOnBlur = () => {
    updateTodo(todo);
    setIsActive(false);
  };

  const handleOnChange = (e) => {
    setTodo({ id: item.id, text: e.target.value });
  };

  const handleOnClick = (e) => {
    setIsActive(true);
    setFocusedId(item.id);
  };

  const handleOnFocus = () => {
    setIsActive(true);
    setTodo({ text: item.text });
    setFocusedId(item.id);
  };

  return (
    <div className="todo-container" key={item.id}>
      <input type="radio" />

      <div className="todo-item-content">
        <input
          onFocus={handleOnFocus}
          className="todo-input"
          // onClick={handleOnClick}
          autoFocus
          id={item.id}
          value={item.id === focusedId ? todo.text : item.text}
          onChange={handleOnChange}
          onBlurCapture={handleOnBlur}
          type="text"
        />
      </div>

      {isActive && <h3 onClick={handleOnClick}>Add note</h3>}
      <hr />
    </div>
  );
};

export default TodoItem;
