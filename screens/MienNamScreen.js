import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';

const MienNamScreen = () => {

  const [userName, setUserName] = useState('');

  useEffect(() => {
    getUser();
    
  }, []);

  const onMessage1 = (m) => {
    alert(m.nativeEvent.data);
  }

  const getUser = async() => {
    let userNameinfo = await AsyncStorage.getItem('userName');
    setUserName(userNameinfo)
  }

    return (
      <View style={{ flex: 1 }}>
        <WebView
              source={{
                uri: 'https://nhocbi.com/xoso/miennam?username=' + userName,
                baseUrl: '',
              }}
              startInLoadingState={true}
              onMessage={m => onMessage1(m)} 
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
