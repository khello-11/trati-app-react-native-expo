import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Touchable,
} from "react-native";
import React from "react";
const behavior = Platform.OS === "ios" ? "padding" : "height";
const browser = Platform.OS === "web";

export const KeyboardAvoidingComponent = ({ children }: any) => {
  return (
    <>
      {browser ? (
        <View style={{ flex: 1 }}>{children}</View>
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
            <View style={{ flex: 1 }}>{children}</View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};
