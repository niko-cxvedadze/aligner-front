import dayjs from "dayjs";

export function formatDate(date: string, variant: "standard") {
  if (variant === "standard") {
    return dayjs(date).format("DD MMM YYYY");
  }
}
