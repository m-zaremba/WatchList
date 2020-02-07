import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import { allThemes, withTheme } from "../contexts/ThemeContext";
import { MoviesListContext } from "../contexts/MovieListContext";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";

const Settings = ({ activeTheme, setTheme, navigation }) => {
  const { clearMovieList } = useContext(MoviesListContext);
  
  const renderItem = ({ item }) => (
    <TouchableOpacity style={{marginTop: 4, marginBottom: 4}}
      onPress={() => setTheme(item.key) || navigation.navigate("Home")}
    >
      <View style={{...styles.listElement, borderColor: activeTheme.modalBackground}}>
        <View
          style={{
            ...styles.itemContainer,
            backgroundColor: item.backgroundColor,
          }}
        >
          <Text style={{ ...styles.itemText, color: item.color }}>
            Background
          </Text>
        </View>
        <View
          style={{
            ...styles.itemContainer,
            backgroundColor: item.color,
          }}
        >
          <Text style={{ ...styles.itemText, color: item.backgroundColor }}>
            Text
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        ...styles.settingsContainer,
        backgroundColor: activeTheme.backgroundColor
      }}
    >
      <View style={styles.settingsWrapper}>
        <FlatList
          ListHeaderComponent={
            <Text style={{ ...styles.headline, color: activeTheme.color }}>
              THEME YOUR APP:
            </Text>
          }
          data={allThemes}
          renderItem={renderItem}
        />
        <Text style={{ fontSize: 30, color: activeTheme.color, alignSelf: 'center' }}>Clear all data</Text>
        <TouchableOpacity style={styles.clearIcon}
          onPress={() => {
            clearMovieList();
          }}
        >
          <Icon
            name="md-close-circle"
            size={75}
            color={activeTheme.color}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

Settings.propTypes = {
  activeTheme: PropTypes.object,
  setTheme: PropTypes.func,
  item: PropTypes.object
};

export const StyledSettings = withTheme(Settings);

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1
  },
  settingsWrapper: {
    flex: 1
  },
  headline: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "200",
    fontSize: 24,
    textAlign: "center"
  },
  itemContainer: {
    height: 70,
    justifyContent: "center",
    flex: 1
  },
  itemText: {
    fontWeight: "bold",
    textAlign: 'center'
  },
  listElement: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 15
  },
  clearIcon: {
    marginBottom: 50,
    alignSelf: 'center'
  }
});
