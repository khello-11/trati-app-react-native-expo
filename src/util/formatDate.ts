import { DateTime } from "luxon";

export const formatDate = (time: number) => {
  const date = DateTime.fromMillis(time).setLocale("de");
  const humanReadable = date.toFormat("dd.LL.yyyy - HH:mm");

  return humanReadable;
};
