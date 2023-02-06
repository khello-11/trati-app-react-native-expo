import create from "zustand";
import { persist } from "zustand/middleware";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

interface UserInfo {
  firstName: string;
  lastName: string;
  position: string;
  company: string;
}

interface RecordState {
  useInfo: UserInfo;
  setUserInfo: (newUserInfo: UserInfo) => void;
  removeUserInfo: () => void;
}
const initialUserInfo: UserInfo = { firstName: "", lastName: "", position: "", company: "" };

export const useUserInfoStore = create<RecordState>()(
  persist(
    (set, get) => ({
      useInfo: initialUserInfo,
      setUserInfo: newUserInfo => set(state => ({ ...state, useInfo: { ...newUserInfo } })),
      removeUserInfo: () => set({ useInfo: initialUserInfo }),
    }),
    {
      name: "trati-user-info", // name of item in the storage (must be unique)
      getStorage: () =>
        Platform.OS === "web"
          ? AsyncStorage
          : {
              getItem: SecureStore.getItemAsync,
              setItem: SecureStore.setItemAsync,
              removeItem: SecureStore.deleteItemAsync,
            },
    }
  )
);
