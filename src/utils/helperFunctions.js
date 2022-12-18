import dayjs from "dayjs";

const getTime = (time) => {
  if (!time) return "";

  const d = dayjs(Date.now());
  let daysDifference = d.diff(dayjs(time).format("YYYY-MM-DD"), "day");

  if (daysDifference === 1) {
    return "yesterday";
  } else if (daysDifference > 7) {
    return dayjs(time).format("DD/MM/YYYY");
  } else if (daysDifference > 1) {
    return dayjs(time).format("ddd");
  } else {
    return dayjs(time).format("HH:MM");
  }
};

export { getTime };
