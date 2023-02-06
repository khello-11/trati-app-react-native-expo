import create from "zustand";
import { TimeTrackingRecord } from "../model/TimeTrackingRecord";

interface state {
  currentRecord: TimeTrackingRecord;
  setCurrentRecord: (newCurrentRecord: TimeTrackingRecord) => void;
  records: TimeTrackingRecord[];
  setRecords: (newRecords: TimeTrackingRecord[]) => void;
  addRecord: (newRecord: TimeTrackingRecord) => void;
  // removeRecord: (currentRecord: TimeTrackingRecord) => void;
}

const initialCurrentRecords: TimeTrackingRecord = { startTime: 0, endTime: 0, id: 0, comment: "", workingTime: 0 };

export const useRecordsStore = create<state>(set => ({
  currentRecord: initialCurrentRecords,
  setCurrentRecord: newCurrentRecord => set(state => ({ ...state, currentRecord: { ...newCurrentRecord } })),
  records: [],
  setRecords: newRecords => set(state => ({ ...state, records: [...newRecords] })),

  addRecord: newRecord =>
    set(state => ({ ...state, records: [...state.records, { ...newRecord }], currentRecord: initialCurrentRecords })),
  // removeRecord: currentRecord => set(() => ({ currentRecord: initialCurrentRecords })),
}));
