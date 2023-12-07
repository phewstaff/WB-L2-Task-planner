import { showNotification } from "./showNotification";

export const scheduleNotification = (todoDate) => {
  const currentDate = new Date();
  const timeDifference = todoDate - currentDate;

  if (timeDifference > 0) {
    setTimeout(() => {
      showNotification("Your to-do is due soon!");
    }, timeDifference);
  }
};
