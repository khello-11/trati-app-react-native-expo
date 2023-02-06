import { Platform } from "react-native";

import "intl";
import "intl/locale-data/jsonp/en";
import "intl/locale-data/jsonp/de";
import { Navigation } from "./src/navigation/navigation";
// import { RootStackParamList } from "./src/navigation/types";

if (Platform.OS === "android") {
  // See https://github.com/expo/expo/issues/6536 for this issue.
  if (typeof (Intl as any).__disableRegExpRestore === "function") {
    (Intl as any).__disableRegExpRestore();
  }
}

// const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <>
      <Navigation />
    </>
  );
};

export default App;
