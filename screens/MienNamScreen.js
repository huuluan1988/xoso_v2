import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native'

const MienNamScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    getUser();
    
  }, []);

  const onMessage = (m) => {
    // alert(m.nativeEvent.data);
    if(m.nativeEvent.data = 'not_username'){
      showAlert();
    }
  }

  const getUser = async() => {
    let userNameinfo = await AsyncStorage.getItem('userName');
    setUserName(userNameinfo)
  }

  const showAlert=() =>{
    Alert.alert(
      'Thông báo!',
      'Xin vui lòng đăng nhập để tham gia dự đoán?',
      [
        {text: 'Thoát'},
        {text: 'Đồng ý', onPress: () => navigation.navigate('SplashScreen')},
      ],
      { cancelable: false }
    );
}

    return (
      <View style={{ flex: 1 }}>
        <WebView
              source={{
                uri: 'https://nhocbi.com/xoso/miennam?username=' + userName,
                baseUrl: '',
              }}
              startInLoadingState={true}
              onMessage={m => onMessage(m)} 
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
