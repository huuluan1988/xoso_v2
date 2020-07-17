import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MienTrungScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Miền Trung Screen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default MienTrungScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
