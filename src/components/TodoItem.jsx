import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../AppContext";

import "../assets/styles/CustomCheckbox.css";
import calendarToggle from "../assets/images/calendar.svg";
import deleteIcon from "../assets/images/delete.svg";

import DatePopup from "./DatePopup";
import CustomInput from "./CustomInput";
import { scheduleNotification } from "../hooks/scheduleNotification";
import { parseCustomDate } from "../hooks/parseCustomDate";

const TodoItem = ({ item, focusedId, setFocusedId, todo, setTodo }) => {
  const [isNoteVisible, setNoteVisible] = useState(false);
  const { updateTodo, deleteTodo } = useContext(AppContext);

  const [completed, setCompleted] = useState(item.completed || false);

  const isNoteEmpty = item.note.trim().length === 0;
  const isDateEmpty = item.date.trim().length === 0;
  const isTimeEmpty = item.time.trim().length === 0;

  console.log(item.time);

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

  const handleCheckboxChange = () => {
    setCompleted(!completed);
    updateTodo({ ...item, completed: !completed });
  };

  const [isPopupOpen, setPopupOpen] = useState(false);

  const togglePopup = () => {
    setFocusedId(item.id);
    setPopupOpen(!isPopupOpen);
  };

  const handleSubmitDate = (selectedDate, selectedTime) => {
    updateTodo({ ...item, date: selectedDate, time: selectedTime });

    const todoDate = parseCustomDate(selectedDate + " " + selectedTime);
    scheduleNotification(todoDate);
  };

  return (
    <div
      className={`todo-container ${completed ? "completed" : ""}`}
      key={item.id}
    >
      <label>
        <input
          type="checkbox"
          className="option-input checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
        />
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
        <img onClick={togglePopup} src={calendarToggle} alt="calendar" />
        <img
          onClick={() => deleteTodo(item.id)}
          src={deleteIcon}
          alt="delete"
        />
      </div>
    </div>
  );
};

export default TodoItem;
