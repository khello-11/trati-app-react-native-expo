import { StackScreenProps } from "@react-navigation/stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
export type RootStackParamList = {
  Start: undefined;
  Dashboard: undefined;
  LogIn: undefined;
  TimeTracking: undefined;
  EndTracking: undefined;
  EditScreen: { recordId: number };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  Screen
>;
