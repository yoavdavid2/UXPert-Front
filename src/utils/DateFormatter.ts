import { DateInfo } from "./types";

export const formatDate = (dateString: string): DateInfo => {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return {
    date: `${day}/${month}`,
    time: `${hours}:${minutes}`,
    fullDate: date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    fullTime: date.toLocaleTimeString("he-IL", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};
