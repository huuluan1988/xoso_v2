import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';


import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'sqlite_xoso.db', createFromLocation : 1});

const MienBacScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    getUser();
    loadHistoryXoSo();
  }, []);

  const onMessage = (m) => {
    if(m.nativeEvent.data = 'not_username'){
      showAlert();
    }
  }
    
  const getUser = async() => {
    let userName = await AsyncStorage.getItem('userName');
    setUserName(userName)
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


  const loadHistoryXoSo = async(v) => {
    // db.transaction(function (tx) {
    //   tx.executeSql('DELETE FROM history_xoso');
    // });

    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM history_xoso' , '', (tx, results) => {
        
        var len = results.rows.length;//chiều dài của mảng
        console.log(results.rows.item(0).id_mien);
        if(len>0){
          
        }
      });
    });
  }


    return (
      <View style={{ flex: 1 }}>
        <WebView
              source={{
                uri: 'https://nhocbi.com/xoso/mienbac?username=' + userName,
                baseUrl: '',
              }}
              startInLoadingState={true}
              onMessage={m => onMessage(m)} 
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
