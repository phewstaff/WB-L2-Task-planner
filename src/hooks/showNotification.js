export const showNotification = (message) => {
  if (Notification.permission === "granted") {
    new Notification("To-Do Reminder", {
      body: message,
    });
  }
};
