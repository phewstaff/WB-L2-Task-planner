import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../AppContext";

import "../assets/styles/CustomCheckbox.css";

import CustomInput from "./CustomInput";

const TodoItem = ({ item, focusedId, setFocusedId, todo, setTodo }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isNoteVisible, setNoteVisible] = useState(false);
  const { updateTodo } = useContext(AppContext);

  const isNoteEmpty = item.note.trim().length === 0;

  const handleTextBlur = () => {
    updateTodo(todo);
    setIsFocused(false);
  };

  const handleTextChange = (e) => {
    setTodo({ ...item, text: e.target.value });
  };

  const handleTextFocus = () => {
    setIsFocused(true);
    setTodo({ ...item });
    setFocusedId(item.id);
    setNoteVisible(true);
  };

  // const handleOnClick = (e) => {
  //   setIsFocused(true);
  //   setFocusedId(item.id);
  // };

  const handleNoteBlur = () => {
    updateTodo(todo);
    setIsFocused(false);
    setNoteVisible(false);
    setFocusedId(null);
  };

  const handleNoteChange = (e) => {
    setTodo({ ...todo, note: e.target.value });
  };

  const handleNoteFocus = () => {
    setTodo({ ...item });
    setFocusedId(item.id);
    setNoteVisible(true);
  };

  return (
    <div className="todo-container" key={item.id}>
      <label>
        <input type="checkbox" className="option-input checkbox" />
      </label>

      <div className="todo-item-content">
        <CustomInput
          handleOnFocus={handleTextFocus}
          className="todo-text-input"
          focusedId={focusedId}
          item={item}
          // onClick={handleOnClick}
          focusedValue={todo.text}
          blurredValue={item.text}
          handleOnChange={handleTextChange}
          handleOnBlur={handleTextBlur}
          autoFocus
          type="text"
        />

        {(!isNoteEmpty || focusedId === item.id) && (
          <CustomInput
            className="todo-note-input"
            placeholder="Add note"
            type="text"
            handleOnFocus={handleNoteFocus}
            focusedId={focusedId}
            item={item}
            focusedValue={todo.note}
            blurredValue={item.note}
            handleOnChange={handleNoteChange}
            handleOnBlur={handleNoteBlur}
          />
        )}
      </div>
      <hr />
    </div>
  );
};

export default TodoItem;
