import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { ThemeContext, activeTheme, withTheme } from '../contexts/ThemeContext';

export const SearchItem = ({ activeTheme, loading, data, searchMovie, shortPlot, setShortPlot }) => {

  return (
    <>
      {(searchMovie === '') ? null
      :
        loading ?
          (
            <ActivityIndicator size='large' color={activeTheme.color} />
          )
        :
        data.Title &&
        (
          <ScrollView contentContainerStyle={styles.movieDetails}>
            <Image
              style={styles.poster}
              source={{uri: data.Poster}}
              resizeMode="contain"
            />
            <View style={styles.stats}>
              <Text style={{...styles.mainText, color: activeTheme.color, flex: 1}}>
                Duration{'\n'}
                <Text style={styles.statsText}>{data.Runtime}</Text>
              </Text>
              <Text style={{...styles.mainText, color: activeTheme.color, flex: 1}}>
                Genre{'\n'}
                <Text style={styles.statsText}>{data.Genre}</Text>
              </Text>
              <Text style={{...styles.mainText, color: activeTheme.color, flex: 1}}>
                Language{'\n'}
                <Text style={styles.statsText}>{data.Language}</Text>
              </Text>
            </View>
            {data.Ratings && <View style={styles.ratingsWrapper}>
              <Text style={{...styles.mainText, color: activeTheme.color, marginBottom: 0}}>Ratings</Text>
              {data.Ratings.map(e => {
                return <Text key={e.Source} style={{...styles.movieRating, color: activeTheme.color}}>{e.Source + ': ' + e.Value}</Text>
              })}
            </View>}
            <Text style={{...styles.mainText, color: activeTheme.color}}>
              Director{'\n'}
              <Text style={{fontWeight: 'normal'}}>{data.Director}</Text>
            </Text>
            <Text style={{...styles.mainText, color: activeTheme.color}}>
              Main cast{'\n'}
              <Text style={{fontWeight: 'normal'}}>{data.Actors}</Text></Text>
            {shortPlot ? (
              <>
                <Text
                  style={{...styles.moviePlot, color: activeTheme.color}}
                  numberOfLines={4}
                >
                  Plot{'\n'}
                  <Text style={{fontWeight: 'normal'}}>{data.Plot}</Text>
                </Text>
                <TouchableOpacity
                  style={styles.showPlotBtn}
                  onPress={() => setShortPlot(false)}
                >
                  <Text style={{color: activeTheme.plotBtnColor}}>Read more</Text>
                </TouchableOpacity>
              </>
            )
            :
            <>
              <Text
                style={{...styles.moviePlot, color: activeTheme.color}}
              >
                Plot{'\n'}
                <Text style={{fontWeight: 'normal'}}>{data.Plot}</Text>
              </Text>
              <TouchableOpacity
                style={styles.showPlotBtn}
                onPress={() => setShortPlot(true)}
              >
                <Text style={{color: activeTheme.plotBtnColor}}>Hide</Text>
              </TouchableOpacity>
            </>
            }
          </ScrollView>
        )
      }
    </>
  )
};

export const StyledSearchItem = withTheme(SearchItem);

const styles = StyleSheet.create({
  mainText: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 'bold',
    marginBottom: 40
  },
  movieDetails: {
    padding: 20,
    justifyContent: 'center',
    marginBottom: 40
  },
  title: {
    fontSize: 35,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  ratingsWrapper: {
    marginBottom: 40
  },
  movieRating: {
    fontSize: 16,
  },
  moviePlot: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 'bold',
    textAlign: 'justify'
  },
  poster: {
    height: 400,
    width: '70%',
    alignSelf: 'center'
  },
  stats: {
    flexDirection: 'row',
    marginTop: 40,
  },
  statsText: {
    fontSize: 16,
    fontWeight: 'normal'
  },
  showPlotBtn: {
    alignItems: 'flex-end'
  }
});
