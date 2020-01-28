import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { withTheme } from "../contexts/ThemeContext";
import PropTypes from "prop-types";

export const MovieDetails = ({
  activeTheme,
  movieDetails,
  modalLoading,
  modalError
}) => {
  const [shortPlot, setShortPlot] = useState(true);

  return (
    <View>
      {modalLoading && (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color={activeTheme.color} />
        </View>
      )}
      {modalError ? (
        <Text>Ups... Something didn`&apos;`t go according to the plan :(</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.movieDetails}>
          <Image
            style={styles.poster}
            source={{ uri: movieDetails.Poster }}
            resizeMode="contain"
          />
          <View style={styles.stats}>
            <Text
              style={{
                ...styles.mainText,
                color: activeTheme.modalFontColor,
                flex: 1
              }}
            >
              Duration{"\n"}
              <Text style={styles.statsText}>{movieDetails.Runtime}</Text>
            </Text>
            <Text
              style={{
                ...styles.mainText,
                color: activeTheme.modalFontColor,
                flex: 1
              }}
            >
              Genre{"\n"}
              <Text style={styles.statsText}>{movieDetails.Genre}</Text>
            </Text>
            <Text
              style={{
                ...styles.mainText,
                color: activeTheme.modalFontColor,
                flex: 1
              }}
            >
              Language{"\n"}
              <Text style={styles.statsText}>{movieDetails.Language}</Text>
            </Text>
          </View>
          {movieDetails.Ratings && (
            <View style={styles.ratingsWrapper}>
              <Text
                style={{
                  ...styles.mainText,
                  color: activeTheme.modalFontColor,
                  marginBottom: 0
                }}
              >
                Ratings
              </Text>
              {movieDetails.Ratings.map(e => {
                return (
                  <Text
                    key={e.Source}
                    style={{
                      ...styles.movieRating,
                      color: activeTheme.modalFontColor
                    }}
                  >
                    {e.Source + ": " + e.Value}
                  </Text>
                );
              })}
            </View>
          )}
          <Text
            style={{ ...styles.mainText, color: activeTheme.modalFontColor }}
          >
            Director{"\n"}
            <Text style={{ fontWeight: "normal" }}>
              {movieDetails.Director}
            </Text>
          </Text>
          <Text
            style={{ ...styles.mainText, color: activeTheme.modalFontColor }}
          >
            Main cast{"\n"}
            <Text style={{ fontWeight: "normal" }}>{movieDetails.Actors}</Text>
          </Text>
          {shortPlot ? (
            <>
              <Text
                style={{
                  ...styles.moviePlot,
                  color: activeTheme.modalFontColor
                }}
                numberOfLines={4}
              >
                Plot{"\n"}
                <Text style={{ fontWeight: "normal" }}>
                  {movieDetails.Plot}
                </Text>
              </Text>
              <TouchableOpacity
                style={styles.showPlotBtn}
                onPress={() => setShortPlot(false)}
              >
                <Text style={{ color: activeTheme.plotBtnColor }}>
                  Read more
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text
                style={{
                  ...styles.moviePlot,
                  color: activeTheme.modalFontColor
                }}
              >
                Plot{"\n"}
                <Text style={{ fontWeight: "normal" }}>
                  {movieDetails.Plot}
                </Text>
              </Text>
              <TouchableOpacity
                style={styles.showPlotBtn}
                onPress={() => setShortPlot(true)}
              >
                <Text style={{ color: activeTheme.plotBtnColor }}>Hide</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
};

MovieDetails.propTypes = {
  activeTheme: PropTypes.object,
  movieDetails: PropTypes.object,
  modalLoading: PropTypes.bool,
  modalError: PropTypes.bool
};

export const StyledMovieDetails = withTheme(MovieDetails);

const styles = StyleSheet.create({
  mainText: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "bold",
    marginBottom: 40
  },
  movieDetails: {
    padding: 20,
    justifyContent: "center"
  },
  title: {
    fontSize: 35,
    textTransform: "uppercase",
    fontWeight: "bold",
    alignSelf: "center"
  },
  ratingsWrapper: {
    marginBottom: 40
  },
  movieRating: {
    fontSize: 16
  },
  moviePlot: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "bold",
    textAlign: "justify"
  },
  poster: {
    height: 400,
    width: "70%",
    alignSelf: "center"
  },
  stats: {
    flexDirection: "row",
    marginTop: 40
  },
  statsText: {
    fontSize: 16,
    fontWeight: "normal"
  },
  showPlotBtn: {
    alignItems: "flex-end"
  }
});
