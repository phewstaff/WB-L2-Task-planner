import React, { useState, useRef, useEffect } from "react";

const DatePopup = ({ isOpen, onClose, onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedDate, selectedTime);
    onClose();
  };

  return (
    isOpen && (
      <form onSubmit={handleSubmit} className="modal-overlay">
        <div className="modal-content" ref={modalRef}>
          <div>
            <label htmlFor="dateInput">Select date: </label>
            <input
              autoFocus
              type="date"
              id="dateInput"
              value={selectedDate}
              onChange={handleDateChange}
            />

            <input
              value={selectedTime}
              onChange={handleTimeChange}
              type="time"
            />
          </div>

          <button type="submit">Add date</button>
        </div>
      </form>
    )
  );
};

export default DatePopup;
