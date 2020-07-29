import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ListView from 'deprecated-react-native-listview';

var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name:'testDB.db',createFromLocation : '~sqlite_xoso.db'});
const History = () => {
    return (
      <View style={styles.container}>
        <Text>History Screen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
