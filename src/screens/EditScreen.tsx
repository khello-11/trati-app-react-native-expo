import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";
import { useRecordsStore } from "../store/useRecordsStore";

import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { RootStackScreenProps } from "../navigation/types";
import { KeyboardAvoidingComponent } from "../components/KeyboardAvoidingComponent";

export const EditScreen = ({ navigation, route }: RootStackScreenProps<"EditScreen">) => {
  const { recordId } = route.params;

  const setRecords = useRecordsStore(state => state.setRecords);
  const records = useRecordsStore(state => state.records);

  const [editComment, setEditRecord] = React.useState(() => {
    const clickedItem = records.find(item => item.id === recordId);
    return clickedItem?.comment ?? "";
  });

  const editHandler = () => {
    const newEditComment = records.map((item, index) => {
      if (item.id === recordId) {
        item.comment = editComment;
      }
      return item;
    });

    setRecords([...newEditComment]);
    setEditRecord("");
    navigation.navigate("Dashboard");
  };
  return (
    <KeyboardAvoidingComponent>
      <View style={styles.container}>
        <Text style={styles.textStyle}> Change Comment: </Text>
        <TextInput
          placeholder="Change your comment.."
          defaultValue={editComment}
          onChangeText={text => setEditRecord(text)}
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.saveBtn} onPress={editHandler}>
          <Text style={styles.saveTextBtn}>Save Comment</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 20,
    marginVertical: 5,
  },
  textInput: {
    borderWidth: 1,
    width: 300,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  saveBtn: {
    backgroundColor: colors.MAIN_BTN,
    padding: 15,
    borderWidth: 2,
    borderColor: colors.LIGHT,
    borderRadius: 5,
    marginVertical: 5,
  },
  saveTextBtn: {
    color: colors.LIGHT,
  },
});
