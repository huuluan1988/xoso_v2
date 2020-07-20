import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const MienTrungScreen = () => {
    return (
      <View style={{ flex: 1 }}>
        
          <WebView
                source={{
                  uri: 'https://nhocbi.com/xoso/mientrung',
                  baseUrl: '',
                }}
                startInLoadingState={true}

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
