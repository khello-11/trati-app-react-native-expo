import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { RootStackScreenProps } from "../navigation/types";
import { TextInput } from "react-native-gesture-handler";
import colors from "../constants/colors";
import { KeyboardAvoidingComponent } from "../components/KeyboardAvoidingComponent";
import { useRecordsStore } from "../store/useRecordsStore";

export const EndTrackingScreen = ({ navigation }: RootStackScreenProps<"EndTracking">) => {
  const currentRecord = useRecordsStore(state => state.currentRecord);
  const addRecord = useRecordsStore(state => state.addRecord);

  const [inputValue, setInputValue] = React.useState("");

  const onBtnPressed = () => {
    addRecord({ ...currentRecord, comment: inputValue });
    navigation.navigate("Dashboard");
  };

  return (
    <KeyboardAvoidingComponent>
      <View style={styles.container}>
        <View style={styles.secondContainer}>
          <View style={styles.message}>
            <Text style={styles.textMessage}>To end Time tracking, please describe what you did.</Text>
          </View>
          <TextInput
            placeholderTextColor={colors.MESSAGE_COLOR}
            style={styles.inputStyle}
            placeholder="Write a comment..."
            value={inputValue}
            onChangeText={text => setInputValue(text)}
          />
          <TouchableOpacity style={styles.btn} onPress={onBtnPressed}>
            <Text style={styles.textBtn}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.BACKGROUND,
    paddingHorizontal: 20,
  },
  secondContainer: {
    maxWidth: 400,
    width: "100%",
    height: 350,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: colors.LIGHT,
    shadowColor: colors.SHADOW_COLOR2,
    elevation: 25,
    shadowOffset: { width: 6, height: 6 },
    backgroundColor: colors.LIGHT,
  },
  message: {
    alignSelf: "flex-start",
    justifyContent: "center",
    marginTop: 25,
    borderRadius: 10,
  },
  textMessage: {
    color: colors.MESSAGE_COLOR,
    fontSize: 23,
    fontWeight: "bold",
    alignSelf: "flex-start",
    justifyContent: "center",
    padding: 15,
    paddingHorizontal: 8,
    borderRadius: 10,
  },

  inputStyle: {
    color: colors.MESSAGE_COLOR,
    backgroundColor: colors.LIGHT,
    fontSize: 15,
    justifyContent: "center",
    alignSelf: "stretch",

    paddingHorizontal: 8,
    padding: 20,
    borderRadius: 10,
    borderColor: colors.MESSAGE_COLOR,
    borderWidth: 1,
    borderStyle: "solid",
    fontWeight: "bold",
  },
  btn: {
    marginTop: 35,

    alignSelf: "flex-start",

    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.LIGHT,
    width: 120,
    backgroundColor: colors.MAIN_BTN,
  },
  textBtn: {
    color: colors.LIGHT,
    fontSize: 15,
    padding: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
