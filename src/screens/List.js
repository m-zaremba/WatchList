import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { withTheme } from "../contexts/ThemeContext";
import PropTypes from "prop-types";

const List = ({ activeTheme }) => {
  return (
    <View
      style={{
        ...style.listView,
        backgroundColor: activeTheme.backgroundColor
      }}
    >
      <Text style={{ ...style.listText, color: activeTheme.color }}>
        List Screen
      </Text>
    </View>
  );
};

List.propTypes = {
  activeTheme: PropTypes.object
};

export const StyledList = withTheme(List);

const style = StyleSheet.create({
  listView: {
    paddingTop: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  listText: {
    fontSize: 40,
    fontWeight: "bold"
  }
});
