import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

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