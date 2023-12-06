import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../AppContext";

import "../assets/styles/CustomCheckbox.css";
import calendarToggle from "../assets/images/calendar.svg";
import info from "../assets/images/info.svg";
import deleteIcon from "../assets/images/delete.svg";

import DatePopup from "./DatePopup";
import CustomInput from "./CustomInput";

const TodoItem = ({ item, focusedId, setFocusedId, todo, setTodo }) => {
  const [isNoteVisible, setNoteVisible] = useState(false);
  const { updateTodo, deleteTodo } = useContext(AppContext);

  const isNoteEmpty = item.note.trim().length === 0;
  const isDateEmpty = item.date.trim().length === 0;
  const isTimeEmpty = item.time.trim().length === 0;

  const handleTextBlur = () => {
    updateTodo(todo);
  };

  const handleTextChange = (e) => {
    setTodo({ ...item, text: e.target.value });
  };

  const handleTextFocus = () => {
    setTodo({ ...item });
    setFocusedId(item.id);
    setNoteVisible(true);
  };

  const handleNoteBlur = () => {
    updateTodo(todo);
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

  const [isPopupOpen, setPopupOpen] = useState(false);

  const togglePopup = () => {
    setFocusedId(item.id);
    setPopupOpen(!isPopupOpen);
  };

  const handleSubmitDate = (selectedDate, selectedTime) => {
    updateTodo({ ...item, date: selectedDate, time: selectedTime });
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

        <div className="date-container">
          {!isDateEmpty && <p className="date">{item.date}</p>}
          {!isTimeEmpty && <p className="date">{item.time}</p>}
        </div>
      </div>

      <DatePopup
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        onSubmit={handleSubmitDate}
      />

      <div className="actions">
        <img onClick={togglePopup} src={calendarToggle} />
        <img onClick={() => deleteTodo(item.id)} src={deleteIcon} />
      </div>
    </div>
  );
};

export default TodoItem;
