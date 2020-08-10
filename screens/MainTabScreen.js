import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import MienBacScreen from './MienBacScreen';
import MienNamScreen from './MienNamScreen';
import MienTrungScreen from './MienTrungScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import EditProfileScreen from './EditProfileScreen';


const HomeStack = createStackNavigator();
const MienBacStack = createStackNavigator();
const MienNamStack = createStackNavigator();
const MienTrungStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
    
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MienBac"
        component={MienBacStackScreen}
        options={{
          tabBarLabel: 'Miền Bắc',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            // <Icon name="ios-notifications" color={color} size={26} />
            <Image styles ={{borderRadius: 5}}
                source={require('../assets/icon-mienbac.png')}
              size={50}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MienNam"
        component={MienNamStackScreen}
        options={{
          tabBarLabel: 'Miền Nam',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            // <Icon name="ios-aperture" color={color} size={26} />
            <Image styles ={{borderRadius: 5}}
                source={require('../assets/icon-miennam.png')}
              size={50}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MienTrung"
        component={MienTrungStackScreen}
        options={{
          tabBarLabel: 'Miền Trung',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            // <Icon name="ios-aperture" color={color} size={26} />
            <Image styles ={{borderRadius: 5}}
                source={require('../assets/icon-mientrung.png')}
              size={50}
            />
          ),
        }}
      />
      
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (

  
<HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 15,
        }
    }}>
        <HomeStack.Screen name="Home"  component={HomeScreen} options={{
        title:'Dò Xổ Số Lô Đề Nhanh Nhất',
        headerLeft: () => (
          <View style={{marginLeft:10}}>
            <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
          </View>
        )
        }} />
</HomeStack.Navigator>
);

const MienBacStackScreen = ({navigation}) => (
<MienBacStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <MienBacStack.Screen name="Miền Bắc" component={MienBacScreen} options={{
        headerLeft: () => (
          <View style={{marginLeft:10}}>
            <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
          </View>
        )
        }} />
</MienBacStack.Navigator>
);

const MienNamStackScreen = ({navigation}) => (
  <MienNamStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <MienNamStack.Screen name="Miền Nam" component={MienNamScreen} options={{
          headerLeft: () => (
            <View style={{marginLeft:10}}>
              <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
            </View>
          )
          }} />
  </MienNamStack.Navigator>
  );

const MienTrungStackScreen = ({navigation}) => (
<MienTrungStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <MienTrungStack.Screen name="Miền Trung" component={MienTrungScreen} options={{
        headerLeft: () => (
          <View style={{marginLeft:10}}>
            <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
          </View>
        )
        }} />
</MienTrungStack.Navigator>

);


    