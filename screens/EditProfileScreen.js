// https://www.youtube.com/watch?v=-40TBdSRk6E
// https://topdev.vn/blog/su-dung-usereducer-va-usecontext-de-lam-global-state/
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
} from 'react-native';

import { useTheme } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-crop-picker';
import { AuthContext } from '../components/context';

const EditProfileScreen = () => {

  const [image, setImage] = useState('https://nhocbi.com/public/static/templates/frontend/xoso/logo.png');
  const [imageAvata, setAvata] = useState('');
  const [fullName, setfullName] = React.useState("");
  const [city, setCity] = React.useState("");
  const { colors } = useTheme();

  const { avataState } = React.useContext(AuthContext);
  const { fullNameState } = React.useContext(AuthContext);

  const [data, setData] = React.useState({
    fullname: '',
    city: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });


  const textFullNameChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        fullname: val,
        check_textInputChange: true,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        fullname: val,
        check_textInputChange: false,
        isValidUser: false
      });
    }
  }
  const textCityChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        city: val,
        check_textInputChange: true,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        city: val,
        check_textInputChange: false,
        isValidUser: false
      });
    }
  }

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      setAvata(image.path);
      this.bs.current.snapTo(1);
    });
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      setAvata(image.path);
      this.bs.current.snapTo(1);
    });
  }

  useEffect(() => {
    console.log(colors);
    getUserName()
    getImgAvata();

  }, []);

  const getImgAvata = async () => {

    let imageAvata = await AsyncStorage.getItem('imageAvata');
    console.log('luan222', imageAvata);
    setAvata(imageAvata);
  }


  const getUserName = async () => {
    let fullName = await AsyncStorage.getItem('fullname');
    let userCity = await AsyncStorage.getItem('city');
    setfullName(fullName);
    setCity(userCity);
  }

  const showUpdateToast = async () => {
    Toast.show("Cập nhật thành công", Toast.LONG, Toast.TOP);
  }

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const saveProfile = async (fullnameInput, cityInput) => {
    if (fullnameInput != '' || fullName) {
      try {
        await AsyncStorage.setItem('imageAvata', imageAvata ? imageAvata : image);
      } catch (e) {
        console.log(e);
      };

      try {
        await AsyncStorage.setItem('fullname', fullnameInput);
      } catch (e) {
        console.log(e);
      };

      avataState(imageAvata ? imageAvata : image);
      fullNameState(fullnameInput ? fullnameInput : fullName);

      let userName = await AsyncStorage.getItem('userName');

      return fetch('https://nhocbi.com/xoso/user', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userName,
          fullname: fullnameInput ? fullnameInput : fullName,
          city: cityInput ? cityInput : city,
          image: imageAvata ? imageAvata : image,
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.Code == 1) {
            console.log(responseJson);
            showUpdateToast();
            setfullName(fullnameInput ? fullnameInput : fullName );
            setCity(cityInput ? cityInput : city);
          } else {
            console.log(responseJson);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert('Tên không được rỗng');
    };
  }


  bs = React.createRef();
  fall = new Animated.Value(1);

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={this.bs}
        snapPoints={[330, 0]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      />
      <Animated.View style={{
        margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
      }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{
                  uri: imageAvata ? imageAvata : image,
                }}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
            {fullName}
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Tên của bạn"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(val) => textFullNameChange(val)}
            defaultValue={fullName}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Icon name="map-marker-outline" color={colors.text} size={20} />
          <TextInput
            placeholder="Thành Phố"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(val) => textCityChange(val)}
            defaultValue={city}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={() => { saveProfile(data.fullname, data.city) }}>
          <Text style={styles.panelButtonTitle}>Đồng ý</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});