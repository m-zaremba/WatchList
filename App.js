import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    <>
      <View style={styles.mainView}>
        <Text style={styles.mainText}>Hello Native World</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    paddingTop: 40,
    display: 'flex',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 40,
    fontWeight: 'bold'
  },
});

export default App;
