import React from "react";
import { StyleSheet } from "react-native";
import { BottomTabBar } from "react-navigation-tabs";
import { withTheme } from "../contexts/ThemeContext";
import PropTypes from "prop-types";

const TabBar = props => {
  return (
    <BottomTabBar
      {...props}
      activeTintColor={props.activeTheme.color}
      labelStyle={style.label}
      style={{
        backgroundColor: props.activeTheme.backgroundColor,
        borderTopColor: props.activeTheme.backgroundColor
      }}
    />
  );
};

TabBar.propTypes = {
  props: PropTypes.object,
  activeTheme: PropTypes.object
};

export const StyledTabBar = withTheme(TabBar);

const style = StyleSheet.create({
  label: {
    display: "none"
  }
});
