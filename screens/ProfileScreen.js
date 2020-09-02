import React, {useState, useEffect}from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { MyContext } from '../components/mycontext';
const ProfileScreen = () => {

  const [imageAvata, setAvata] = useState('');
  const [userName, setUserName] = useState('');
  const [userCity, setUserCity] = useState('');
  const [fullName, setfullName] = React.useState("");
  const [tong, setTong] = React.useState("");
  const [tongTrung, setThongTrung] = useState("");

  const { avataUser } = React.useContext(MyContext);
    const [stateAvataUser, setStateAvataUser] = avataUser;
    const { fullNameUser } = React.useContext(MyContext);
    const [stateFullNameUser, setStateFullNameUser] = fullNameUser;
    

  useEffect(() => {
    
    getImgAvata();
    getUserInfo();
    loadTyleDuDoan();
  }, []);

  const getImgAvata = async() => {
    
    let imageAvata = await AsyncStorage.getItem('imageAvata');
    console.warn('luan111', imageAvata);
    setAvata(imageAvata)
  }

  const getUserInfo = async() => {
    let fullname = await AsyncStorage.getItem('fullname');
    let username = await AsyncStorage.getItem('userName');
    let city = await AsyncStorage.getItem('city');
    setfullName(fullname);
    setUserName(username);
    setUserCity(city);
  }

  const loadTyleDuDoan = async(v) => {
    let username = await AsyncStorage.getItem('userName');
      fetch("http://nhocbi.com/xoso/tyle_du_doan?username=" + username,  {
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    }).then(res => res.json())
      .then(data => {
        
         total = 0;
         total_trung = 0;
          for (var i=0; i<data.length; i++) {
              total += data[i].tong;
              total_trung += data[i].tong_trung;
          }
          setTong(total);
          setThongTrung(total_trung);
      });
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={{
              uri: stateAvataUser ? stateAvataUser : imageAvata,
            }}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{stateFullNameUser ? stateFullNameUser : fullName}</Title>
            <Caption style={styles.caption}>{userName}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Ionicons name="ios-person" color="#777777" size={23}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{stateFullNameUser ? stateFullNameUser : fullName}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="map-marker" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{userCity ? userCity : '???'} </Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>???</Text>
        </View>
        
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>{tongTrung}</Title>
            <Caption>Dự đoán trúng</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>{tong}</Title>
            <Caption>Số lần dự đoán</Caption>
          </View>
      </View>

      {/* <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="settings-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View> */}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});