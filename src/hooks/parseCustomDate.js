export const parseCustomDate = (dateString) => {
  const [year, month, dayTime] = dateString.split("-");
  let [day, time] = dayTime.split(" ");

  if (!time) {
    time = "00:00";
  }

  const [hours, minutes] = time.split(":");

  return new Date(year, month - 1, day, hours, minutes);
};

// const today = new Date();
// const timeDifferenceInMillis = todoDate - today;

// const timeDifferenceInMinutes = Math.ceil(timeDifferenceInMillis / (1000 * 60));
