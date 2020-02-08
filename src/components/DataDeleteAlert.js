import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { withTheme } from "../contexts/ThemeContext";
import { MoviesListContext } from "../contexts/MovieListContext";
import PropTypes from "prop-types";

const DataDeleteAlert = ({ activeTheme, setShowDeleteAlert }) => {
  const { clearMovieList } = useContext(MoviesListContext);
  return (
    <View style={styles.alertContainer}>
      <View
        style={{
          ...styles.alertWrapper,
          backgroundColor: activeTheme.backgroundColor,
          borderColor: activeTheme.color
        }}
      >
        <Text style={{ ...styles.alertMessage, color: activeTheme.color }}>
          Do you really want to erase all data?
        </Text>
        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            style={{
              ...styles.alertButton,
              backgroundColor: activeTheme.modalBackground
            }}
            onPress={() => {
              setShowDeleteAlert(false) || clearMovieList();
            }}
          >
            <Text style={{ color: activeTheme.modalFontColor }}>CONFIRM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.alertButton,
              backgroundColor: activeTheme.modalBackground
            }}
            onPress={() => {
              setShowDeleteAlert(false);
            }}
          >
            <Text style={{ color: activeTheme.modalFontColor }}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

DataDeleteAlert.propTypes = {
  activeTheme: PropTypes.object,
  setShowDeleteAlert: PropTypes.func
};

export const StyledDataDeleteAlert = withTheme(DataDeleteAlert);

const styles = StyleSheet.create({
  alertContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5
  },
  alertWrapper: {
    width: "90%",
    height: "30%",
    borderRadius: 5,
    padding: 10,
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 2
  },
  alertMessage: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  alertButton: {
    alignItems: "center",
    width: "40%",
    padding: 5,
    margin: 10
  },
  buttonsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
