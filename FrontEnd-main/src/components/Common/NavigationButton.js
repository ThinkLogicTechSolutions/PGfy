import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import HapticFeedback from "react-native-haptic-feedback"; // Import for haptic feedback

const NavigationButton = ({ text, color = "#1330BE", onPress }) => {
  const handlePress = () => {
    HapticFeedback.trigger("impactHigh");
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={handlePress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default NavigationButton;

const styles = StyleSheet.create({
  button: {
    width: 180,
    height: 50,
    paddingVertical: 8,
    borderRadius: 10,
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    color: "#FFFFFF", // White color for the text
    fontWeight: "600",
    fontSize: 22.32,
  },
});
