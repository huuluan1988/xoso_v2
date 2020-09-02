/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';

import { DrawerContent } from './screens/DrawerContent';

import MainTabScreen from './screens/MainTabScreen';
import SettingsScreen from './screens/SettingsScreen';
import HistoryScreen from './screens/HistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import RootStackScreen from './screens/RootStackScreen';

import { AuthContext } from './components/context';
import { MyContext } from './components/mycontext';

import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';

const ProfileStack = createStackNavigator();
const HistoryStack = createStackNavigator();
const SettingStack = createStackNavigator();
const Drawer = createDrawerNavigator();

import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'sqlite_xoso.db', createFromLocation : 1});


const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null); 

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [theme1, setTheme] = useState('Light');

  const [value, setValue] = React.useState("foo");
  const [avataUser, setAvataUser] = React.useState("");
  const [fullNameUser, setFullNameUser] = React.useState("");

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  
  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
 
  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userName');
        await AsyncStorage.removeItem('imageAvata');
        await AsyncStorage.removeItem('fullname');
        await AsyncStorage.removeItem('city');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    },

    avataState: async(v) => {
      setAvataUser(v);
    },
    fullNameState: async(v) => {
      setFullNameUser(v);
    },

  }), []);

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
      
      loadUser();
      loadHistory();
      loadHistoryDaiXoSo();

      checkPermission();
      createNotificationListeners(); //add this line
      
    }, 100);
   
  }, []);

  const loadUser = async() => {
    let userNameAsy = await AsyncStorage.getItem('userName');

    fetch("http://nhocbi.com/xoso/list_user" + '?username=' + userNameAsy, {
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    }).then(res => res.json())
      .then(data => {
        data.map(v=>{
          saveprofile(v);
        })
      });
  }

  const loadHistory = async() => {
    let userNameAsy = await AsyncStorage.getItem('userName');

    
    fetch("http://nhocbi.com/xoso/list_so_dudoan_all?username=" + userNameAsy, {
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    }).then(res => res.json())
      .then(data => {
      
        db.transaction(function (tx) {
          tx.executeSql('DELETE FROM history_dudoan');
        });
        data.map(v=>{
          db.transaction(function (tx) {
            tx.executeSql('INSERT INTO history_dudoan (so_dudoan, dai_dudoan_text, dai_dudoan_sub, so_trung, dai_dudoan, created) VALUES (?,?,?,?,?,?)', [v.so_dudoan, v.dai_dudoan_text, v.dai_dudoan_sub, v.xoso_is_trung, v.dai_dudoan,  v.created]);
          });
       })
      });
  }

  const loadHistoryDaiXoSo = async() => {

    fetch("https://nhocbi.com/xoso/get_lich_su_xoso?kq_mien=mientrung", {
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    }).then(res => res.json())
      .then(data => {
        data.map(v=>{
          db.transaction(function (tx) {
            tx.executeSql('INSERT INTO history_xoso (id_mien, content, date, created) VALUES (?,?,?,?)', [v.mien, v.content, v.date, v.created]);
          });
       })
      });
  }

  const saveprofile = async(v) =>  {
    await AsyncStorage.setItem('fullname', v.fullname);
    await AsyncStorage.setItem('city', v.city);
    await AsyncStorage.setItem('imageAvata', v.image);
  }


  //1
  const checkPermission = async() =>  {
    
    const enabled = await firebase.messaging().hasPermission();
    
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  }

  //3
  const getToken = async() => {
    
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    
    // this.setState({ fcmToken: fcmToken });  
   
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
        

      }
      
    }
    console.log('fcmToken33:', fcmToken);
  }

  //2
  const requestPermission = async() => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  const createNotificationListeners = async() => {
    const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const action = notificationOpen.action;
            const notification: Notification = notificationOpen.notification;

          // console.log('111');
            navigationDeferred.promise.then(() => {
            //   this.notificationAction(notification);
            });

        }

        const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
                .setDescription('My apps test channel');
        // Create the channel
        firebase.notifications().android.createChannel(channel);
        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        });
        this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
            // Process your notification as required
            notification
                .android.setChannelId('test-channel')
            firebase.notifications()
                .displayNotification(notification);
                // console.log('222');

        });
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened( async (notificationOpen: NotificationOpen) => {
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;
            // console.log('333');
            navigationDeferred.promise.then(() => {
            //   this.notificationAction(notification);
            });
        });

        this.notificationTopics = firebase.messaging().subscribeToTopic('all');

        this.createRefreshTokenListeners = firebase.messaging().onTokenRefresh(async fcmToken => {
          await this.updateFcmToken(fcmToken);
          await AsyncStorage.setItem('fcmToken', fcmToken);
          // fetch('https://nhocbi.com/xoso/mienbac');
        });
  }

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
    <PaperProvider theme={theme}>
    <AuthContext.Provider value={authContext}>
    <MyContext.Provider
      value={{ fullNameUser: [fullNameUser, setFullNameUser], avataUser: [avataUser, setAvataUser] }}
    >
    <NavigationContainer theme={theme}>
      { loginState.userToken !== null ? (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="Settings" component={SettingStackScreen} />
          <Drawer.Screen name="History" component={HistoryStackScreen} />
          <Drawer.Screen name="Profile" component={ProfileStackScreen} />
        </Drawer.Navigator>
      )
    :
      <RootStackScreen/>
    }
    </NavigationContainer>
    </MyContext.Provider>
    </AuthContext.Provider>
    </PaperProvider>
  );
}

export default App;

  const HistoryStackScreen = ({navigation}) => (
    <HistoryStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#1f65ff',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <HistoryStack.Screen name="Lịch Sử" component={HistoryScreen} options={{
            headerLeft: () => (
              <View style={{marginLeft:10}}>
                <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
              </View>
            )
            }} />
    </HistoryStack.Navigator>
    
    );

    const SettingStackScreen = ({navigation}) => (
      <SettingStack.Navigator screenOptions={{
              headerStyle: {
              backgroundColor: '#1f65ff',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerTitleStyle: {
              fontWeight: 'bold'
              }
          }}>
              <SettingStack.Screen name="Cài đặt" component={SettingsScreen} options={{
              headerLeft: () => (
                <View style={{marginLeft:10}}>
                  <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
                </View>
              )
              }} />
      </SettingStack.Navigator>
      
    );

    const ProfileStackScreen = ({navigation}) => {
      const {colors} = useTheme();
    
      return (
      <ProfileStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
            shadowColor: colors.background, // iOS
            elevation: 0, // Android
          },
          headerTintColor: colors.text,
          headerTitleAlign: 'center',
        }}>
        <ProfileStack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: '',
            headerLeft: () => (
              <View style={{marginLeft:10}}>
                <Icon.Button
                  name="ios-menu"
                  size={25}
                  backgroundColor= {colors.background}
                  color={colors.text}
                  onPress={() => navigation.openDrawer()}
                />
              </View>
            ),
            headerRight: () => (
              <View style={{marginRight:10}}>
                <MaterialCommunityIcons.Button
                  name="account-edit"
                  size={25}
                  backgroundColor= {colors.background}
                  color={colors.text}
                  onPress={() => navigation.navigate('EditProfile')}
                />
              </View>
            ),
          }}
        />
        <ProfileStack.Screen 
          name="EditProfile"
          options={{
            title: 'Edit Profile'
          }}
          component={EditProfileScreen}
        />
      </ProfileStack.Navigator>
    
    )};