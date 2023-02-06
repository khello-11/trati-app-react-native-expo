import React from "react";
import { StyleSheet, Text, View, FlatList, Image, ScrollView } from "react-native";
import colors from "../constants/colors";
import { RootStackScreenProps } from "../navigation/types";
import { ButtonCTA } from "../components/ButtonCTA";
import { useUserInfoStore } from "../store/userInfoStore";

const dataHasName = [{ key: "Simple and accurate time tracking" }, { key: "Time tracker for working hours of teams" }];
const dataNotLoggedIn = [{ key: "Optimize Time management easily" }];

export const StartScreen = ({ navigation }: RootStackScreenProps<"Start">) => {
  const userInfo = useUserInfoStore(state => state.useInfo);
  const removeUserInfo = useUserInfoStore(state => state.removeUserInfo);

  const name = userInfo.firstName;
  const hasName = name && name.trim().length > 0;

  const dashboardBtn = () => {
    navigation.navigate("Dashboard");
  };

  const onLoginBtnPress = () => {
    navigation.navigate("LogIn");
  };

  const removeUserInfoBtn = () => {
    removeUserInfo();
  };

  const url = hasName ? require("../../assets/clock-2.jpg") : require("../../assets/login.jpg");
  const message = hasName ? ` Welcome to your Trati App ${name} you are already logged in!` : "Not logged in yet ?";

  //   {hasName ? (
  //     <>
  //       <ButtonCTA onPress={removeUserInfoBtn} label="Remove UserInfo" iconName="remove-circle" />
  //       <ButtonCTA onPress={dashboardBtn} label="Dashboard Screen" iconName="dashboard" />
  //     </>
  //   ) : (
  //     <ButtonCTA onPress={onLoginBtnPress} label="Login Screen" iconName="login" />
  //   )}
  // </View>
  // <View style={styles.flatListContainer}>
  //   <View style={styles.flatListSecondContainer}>
  //     <FlatList
  //       scrollEnabled={false}
  //       data={hasName ? dataHasName : dataNotLoggedIn}
  //       renderItem={({ item }) => {
  //         return (
  //           <View style={styles.listContainer}>
  //             <Text style={styles.flatListText}>{item.key}</Text>
  //           </View>
  //         );
  //       }}
  //     />
  //   </View>
  return (
    <ScrollView contentContainerStyle={{ minHeight: "100%" }} style={styles.mainContainer}>
      <View style={styles.imageStyleContainer}>
        <Image source={url} resizeMode="contain" style={styles.imageStyle} />
      </View>
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>

          {hasName ? (
            <View style={{ marginTop: 8 }}>
              <ButtonCTA onPress={dashboardBtn} label="Dashboard Screen" iconName="dashboard" />
              <ButtonCTA onPress={removeUserInfoBtn} label="Remove UserInfo" iconName="remove-circle" />
            </View>
          ) : (
            <ButtonCTA onPress={onLoginBtnPress} label="Login Screen" iconName="login" />
          )}
        </View>
        <View style={styles.scrollViewContainer}>
          <View style={styles.scrollViewSecondContainer}>
            <ScrollView>
              {(hasName ? dataHasName : dataNotLoggedIn).map(item => {
                return (
                  <View key={item.key} style={styles.listContainer}>
                    <Text style={styles.flatListText}>{item.key}</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.LIGHT,
    flex: 1,
    padding: 5,
    paddingBottom: 70,
    // borderWidth: 1,
  },
  imageStyleContainer: {
    flex: 4,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
  container: {
    flexDirection: "column",
    flex: 3,
    alignItems: "center",
    backgroundColor: colors.LIGHT,
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    flex: 1,
    // padding: 34,
    justifyContent: "center",
  },
  message: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.MESSAGE_COLOR,
    textAlign: "center",
  },
  listContainer: {
    marginTop: 15,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: colors.PRIMARY,
    padding: 6,
  },
  scrollViewContainer: {
    flex: 1,
    justifyContent: "center",
  },
  flatListSecondContainer: {
    padding: 5,
    paddingBottom: 10,
  },
  scrollViewSecondContainer: {
    justifyContent: "center",
    padding: 22.5,
  },
  flatListText: {
    fontSize: 20,
    color: colors.TEXT_BACKGROUND,
  },
});
