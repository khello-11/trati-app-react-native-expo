import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DashboardScreen } from "../screens/DashboardScreen";
import { EditScreen } from "../screens/EditScreen";
import { EndTrackingScreen } from "../screens/EndTrackingScreen";
import { LogInScreen } from "../screens/LogInScreen";
import { StartScreen } from "../screens/StartScreen";
import { TimeTrackingScreen } from "../screens/TimeTrackingScreen";
import { RootStackParamList } from "./types";

export const Navigation = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen component={StartScreen} name="Start" />
      <Stack.Screen component={DashboardScreen} name="Dashboard" />
      <Stack.Screen component={LogInScreen} name="LogIn" />
      <Stack.Screen component={TimeTrackingScreen} name="TimeTracking" />
      <Stack.Screen component={EndTrackingScreen} name="EndTracking" />
      <Stack.Screen component={EditScreen} name="EditScreen" />
    </Stack.Navigator>
  );
};
