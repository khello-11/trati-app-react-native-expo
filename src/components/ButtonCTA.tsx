import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../constants/colors";

interface Props {
  onPress: () => void;
  label: string;
  iconName?: "login" | "dashboard" | "timer" | "remove-circle";
  isDisabled?: boolean;
  outline?: boolean;
}

export const ButtonCTA = ({ onPress, label, iconName, isDisabled, outline }: Props) => {
  const btnOpacity = isDisabled ? 0.5 : 1;

  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={[
        styles.buttonContainer,
        { backgroundColor: outline ? colors.LIGHT : colors.MAIN_BTN, opacity: btnOpacity },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonLabel, outline ? styles.btnLabelOutline : {}]}>{label}</Text>
      {iconName ? <MaterialIcons name={iconName} size={22} color={colors.LIGHT} style={{ marginLeft: 2 }} /> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 2,
    borderColor: colors.MAIN_BTN,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginTop: 12,

    marginRight: 5,
  },
  buttonLabel: {
    fontSize: 15,
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
    color: colors.LIGHT,
    marginBottom: 2,
  },
  btnLabelOutline: {
    color: colors.MAIN_BTN,
  },
});
