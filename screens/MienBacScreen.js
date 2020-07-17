import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MienBacScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>MienBac Screen</Text>
        <Button
            title="Go to details screen...again"
            onPress={() => navigation.push("MienBac")}
        />
        <Button
            title="Go to home"
            // onPress={() => navigation.navigate("Home")}
        />
        <Button
            title="Go back"
            onPress={() => navigation.goBack()}
        />
      </View>
    );
};

export default MienBacScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
