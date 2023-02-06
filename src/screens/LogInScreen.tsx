import { StyleSheet, TextInput, View, Image } from "react-native";

import React from "react";
import colors from "../constants/colors";

import { KeyboardAvoidingComponent } from "../components/KeyboardAvoidingComponent";

import { RootStackScreenProps } from "../navigation/types";
import { ButtonCTA } from "../components/ButtonCTA";
import { useUserInfoStore } from "../store/userInfoStore";
const initialFormValues = { firstName: "", lastName: "", position: "", company: "" };

export const LogInScreen = ({ navigation }: RootStackScreenProps<"LogIn">) => {
  const setUserInfo = useUserInfoStore(state => state.setUserInfo);

  const [formValues, setFormValues] = React.useState(initialFormValues);

  const isDisabled = formValues.firstName.trim().length === 0 || formValues.company.trim().length === 0;

  const handleNavigation = () => {
    navigation.popToTop();
    navigation.navigate("Dashboard");
  };

  const save = () => {
    setUserInfo(formValues);
    handleNavigation();
  };
  const uri = require("../../assets/data-login.jpg");
  return (
    <View style={styles.mainContainer}>
      <KeyboardAvoidingComponent>
        <View style={styles.formContainer}>
          <Image resizeMode="contain" source={uri} style={styles.loginImageStyle} />

          <View style={styles.formSecondContainer}>
            <TextInput
              value={formValues.firstName}
              onChangeText={text => {
                setFormValues(preState => ({ ...preState, firstName: text }));
              }}
              style={styles.inputStyle}
              placeholderTextColor={colors.INPUT_TEXT}
              placeholder=" First Name "
            />
            <TextInput
              value={formValues.lastName}
              onChangeText={text => {
                setFormValues(preState => ({ ...preState, lastName: text }));
              }}
              style={styles.inputStyle}
              placeholderTextColor={colors.INPUT_TEXT}
              placeholder="Last Name (Optional) "
            />
            <TextInput
              value={formValues.position}
              onChangeText={text => {
                setFormValues(preState => ({ ...preState, position: text }));
              }}
              style={styles.inputStyle}
              placeholderTextColor={colors.INPUT_TEXT}
              placeholder="Position(Optional) "
            />
            <TextInput
              value={formValues.company}
              onChangeText={text => {
                setFormValues(preState => ({ ...preState, company: text }));
              }}
              style={styles.inputStyle}
              placeholderTextColor={colors.INPUT_TEXT}
              placeholder="Company"
            />
            <ButtonCTA onPress={save} label="Log In" isDisabled={isDisabled} iconName="login" />
          </View>
        </View>
      </KeyboardAvoidingComponent>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.LIGHT,
  },

  loginImageStyle: {
    flex: 1,
    width: "auto",
    height: "auto",
    borderColor: "black",
  },
  formContainer: {
    flexDirection: "column",
    flex: 3,
    width: "100%",
  },
  formSecondContainer: {
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: colors.FORM_BACKGROUND,
    padding: 30,
    paddingHorizontal: 65,

    marginBottom: 100,
  },

  inputStyle: {
    marginTop: 3,
    backgroundColor: colors.LIGHT,
    borderWidth: 2,
    borderColor: colors.LIGHT,
    width: 250,
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
    marginHorizontal: 2,
    color: colors.INPUT_TEXT,
    alignItems: "flex-start",
  },
});
