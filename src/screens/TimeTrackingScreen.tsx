import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RootStackScreenProps } from "../navigation/types";
import colors from "../constants/colors";
import { ButtonCTA } from "../components/ButtonCTA";
import { useRecordsStore } from "../store/useRecordsStore";
import { getTimeParts } from "../util/getTimeParts";

export const TimeTrackingScreen = ({ navigation }: RootStackScreenProps<"TimeTracking">) => {
  const [time, setTime] = React.useState(0);
  const [timerOn, setTimerOn] = React.useState(false);

  const currentRecord = useRecordsStore(state => state.currentRecord);
  const setCurrentRecord = useRecordsStore(state => state.setCurrentRecord);

  const { hours, min, secs } = getTimeParts(time);

  React.useEffect(() => {
    let interval: any = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1000);
      }, 0.5);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  const onStartBtnPressed = () => {
    setCurrentRecord({
      startTime: new Date().getTime(),
      endTime: 0,
      id: new Date().getTime(),
      comment: "",
      workingTime: 0,
    });
    setTimerOn(true);
  };

  const onStopBtnPressed = () => {
    setTimerOn(false);
    setCurrentRecord({
      ...currentRecord,
      endTime: new Date().getTime(),
      workingTime: time,
    });

    navigation.navigate("EndTracking");
  };

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <View style={styles.thirdContainer}>
          <Text style={styles.timerText}>{hours}:</Text>
          <Text style={styles.timerText}>{min}:</Text>
          <Text style={styles.timerText}>{secs}</Text>
        </View>
        <View style={styles.forthContainer}>
          {!timerOn && <ButtonCTA onPress={onStartBtnPressed} label="Start" />}

          {timerOn && <ButtonCTA onPress={onStopBtnPressed} label="Stop" />}

          <ButtonCTA label="Reset" onPress={() => setTime(0)} outline />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  secondContainer: {
    maxWidth: 400,
    width: "100%",
    height: 350,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 50,
    borderColor: colors.LIGHT,
    shadowColor: colors.SHADOW_COLOR1,
    elevation: 25,
    shadowOffset: { width: 6, height: 6 },
    backgroundColor: colors.LIGHT,
  },
  thirdContainer: {
    marginBottom: 10,
    flexDirection: "row",
  },
  forthContainer: {
    flexDirection: "row",
  },
  timerText: {
    color: colors.MESSAGE_COLOR,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 45,
    marginBottom: 5,
  },
});
