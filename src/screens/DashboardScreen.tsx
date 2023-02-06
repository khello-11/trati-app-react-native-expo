import { StyleSheet, Text, View, FlatList, Image, Platform, TouchableOpacity, Alert } from "react-native";
import React from "react";
import colors from "../constants/colors";
import { dates } from "../api/Date";
import { formatDate } from "../util/formatDate";
import { RootStackScreenProps } from "../navigation/types";
import { ButtonCTA } from "../components/ButtonCTA";
import { useRecordsStore } from "../store/useRecordsStore";
import { getTimeParts } from "../util/getTimeParts";
import { MaterialIcons } from "@expo/vector-icons";
import { sortData } from "../util/sortData";

export const DashboardScreen = ({ navigation }: RootStackScreenProps<"Dashboard">) => {
  const records = useRecordsStore(state => state.records);
  const setRecords = useRecordsStore(state => state.setRecords);

  React.useEffect(() => {
    if (!!records && records.length === 0) {
      setRecords(dates);
    }
  }, []);

  const sortedData = sortData(records);

  const uri = require("../../assets/dashboard.jpg");
  const onTimeTrackingBtnPressed = () => {
    navigation.navigate("TimeTracking");
  };

  const removeHandler = (id: number) => {
    const filteredRecords = records.filter(record => {
      return record.id !== id;
    });
    setRecords(filteredRecords);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.secondContainer}>
          <View style={styles.imageContainer}>
            <Image source={uri} resizeMode="contain" style={styles.imageStyle} />
          </View>

          <View style={styles.thirdContainer}>
            <ButtonCTA label="Start Time Tracking" onPress={onTimeTrackingBtnPressed} iconName="timer" />

            <FlatList
              style={styles.flatListStyle}
              numColumns={1}
              keyExtractor={item => item.id.toString()}
              data={sortedData}
              renderItem={({ item, index }) => {
                const { hours, min, secs } = getTimeParts(item.workingTime);

                const editFunction = () => {
                  navigation.navigate("EditScreen", { recordId: item.id });
                };

                const displayDeleteAlert =
                  Platform.OS === "web"
                    ? () => {
                        if (Platform.OS === "web") {
                          alert("Are You Sure! This action will delete your Record permanently");
                          removeHandler(item.id);
                        }
                      }
                    : () => {
                        Alert.alert("Are You Sure!", "This action will delete your Record permanently", [
                          {
                            text: "Delete",
                            onPress: () => removeHandler(item.id),
                          },
                          {
                            text: "No Thanks",
                          },
                        ]);
                      };
                return (
                  <View style={styles.dateStyleContainer}>
                    <View style={styles.iconContainer}>
                      <TouchableOpacity onPress={editFunction}>
                        <MaterialIcons name="edit" size={24} color={colors.LIGHT} />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={displayDeleteAlert}>
                        <MaterialIcons
                          name="highlight-remove"
                          size={24}
                          color={colors.ERROR}
                          style={styles.removeIcon}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.dateStyle}>{item.comment}</Text>
                    <Text style={styles.dateStyle}>Start: {formatDate(item.startTime)}</Text>
                    <Text style={styles.dateStyle}>End: {formatDate(item.endTime)}</Text>
                    <Text style={styles.dateStyle}>
                      Working Time: {hours}:{min}:{secs}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.LIGHT,
    marginBottom: 10,
    padding: 20,
  },

  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    marginVertical: 5,
  },
  removeIcon: {
    backgroundColor: colors.LIGHT,
    borderWidth: 1,
    borderColor: colors.ERROR,
    borderRadius: 5,
  },

  secondContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  thirdContainer: {
    flex: 3,
    backgroundColor: colors.LIGHT,
    alignItems: "center",
  },
  imageContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 400,
    width: "100%",
  },
  imageStyle: {
    height: "100%",
    width: "100%",
  },

  flatListStyle: {
    marginTop: 10,
  },

  dateStyleContainer: {
    backgroundColor: colors.MESSAGE_COLOR,
    borderRadius: 10,
    borderColor: colors.LIGHT,
    width: 250,
    borderWidth: 2,
    padding: 15,
    marginHorizontal: 2,
    marginBottom: 3,
    textAlign: "center",
  },
  dateStyle: {
    fontWeight: "bold",
    fontSize: 13,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.LIGHT,
    color: colors.LIGHT,
    marginBottom: 3,
    padding: 3,
  },
});
