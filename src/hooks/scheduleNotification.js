import { showNotification } from "./showNotification";

export const scheduleNotification = (todoDate) => {
  const currentDate = new Date();
  const timeDifference = todoDate - currentDate;

  console.log(1);

  if (timeDifference > 0) {
    setTimeout(() => {
      showNotification("Your to-do is due soon!");
    }, timeDifference);
  }

  console.log(timeDifference);
};
