export const formatDate = (date: string | Date): string => {
  return new Date(date).toISOString().split("T")[0]
}

export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleString("sv-SE", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
