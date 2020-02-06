import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { withTheme } from "../contexts/ThemeContext";
import { MoviesListContext } from "../contexts/MovieListContext";
import PropTypes from "prop-types";

const AlertPopup = ({activeTheme}) => {
  const {
    setAlertMessage,
    setShowAlert,
    setMovieToAdd,
    alertMessage
  } = useContext(MoviesListContext);
  return (
    <View style={styles.alertContainer}>
      <View style={{...styles.alertWrapper, backgroundColor: activeTheme.backgroundColor, borderColor: activeTheme.color}}>
        <Text style={{...styles.alertMessage, color: activeTheme.color}}>{alertMessage}</Text>
        <TouchableOpacity
          style={{...styles.alertButton, backgroundColor: activeTheme.modalBackground}}
          onPress={() => {
            setAlertMessage("") || setShowAlert(false) || setMovieToAdd({});
          }}
        >
          <Text style={{color: activeTheme.modalFontColor}}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

AlertPopup.propTypes = {
  activeTheme: PropTypes.object
};

export const StyledAlertPopup = withTheme(AlertPopup);

const styles = StyleSheet.create({
  alertContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5
  },
  alertWrapper: {
    width: "60%",
    height: '30%',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 2
  },
  alertMessage: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center'
  },
  alertButton: {
    alignItems: 'center',
    width: '80%',
    padding: 5,
  }
});
