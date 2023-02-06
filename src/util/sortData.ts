import { TimeTrackingRecord } from "../model/TimeTrackingRecord";

export const sortData = (data: TimeTrackingRecord[]) => {
  return data.sort((a, b) => {
    return b.startTime - a.startTime;
  });
};
