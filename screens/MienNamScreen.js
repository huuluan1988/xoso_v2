import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
const MienNamScreen = () => {
    return (
      <View style={{ flex: 1 }}>
        <WebView
              source={{
                uri: 'https://nhocbi.com/xoso/miennam',
                baseUrl: '',
              }}
              startInLoadingState={true}

            />
      </View>
    );
};

export default MienNamScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
