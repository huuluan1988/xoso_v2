import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
const MienBacScreen = ({navigation}) => {

  const [userName, setUserName] = useState('');

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async() => {
    let userName = await AsyncStorage.getItem('userName');
    setUserName(userName)
  }

    return (
      <View style={{ flex: 1 }}>
        <WebView
              source={{
                uri: 'https://nhocbi.com/xoso/mienbac?username=' + userName,
                baseUrl: '',
              }}
              startInLoadingState={true}

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
