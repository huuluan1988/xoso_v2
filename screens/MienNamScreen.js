import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
<<<<<<< HEAD

const MienNamScreen = () => {
=======
import {useNetInfo} from "@react-native-community/netinfo";
const MienNamScreen = () => {
  const netInfo = useNetInfo();
>>>>>>> up
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    getUser();
    
  }, []);

  const onMessage = (m) => {
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
        {text: 'Đồng ý', onPress: () => navigation.navigate('SignInScreen')},
      ],
      { cancelable: false }
    );
  }

    return (
      <View style={{ flex: 1 }}>
<<<<<<< HEAD
        <WebView
=======
        {netInfo.isConnected.toString() == 'true' ? <WebView
>>>>>>> up
              source={{
                uri: 'https://nhocbi.com/xoso/miennam?username=' + userName,
                baseUrl: '',
              }}
              startInLoadingState={true}
              onMessage={m => onMessage(m)} 
<<<<<<< HEAD
            />
=======
            /> : <View style={styles.container}><Text>Vui lòng kết nối internet để tham gia dự đoán!</Text></View> }
>>>>>>> up
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
