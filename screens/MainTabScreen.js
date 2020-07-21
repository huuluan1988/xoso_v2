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
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MienNam"
        component={MienNamStackScreen}
        options={{
          tabBarLabel: 'Miền Nam',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MienTrung"
        component={MienTrungStackScreen}
        options={{
          tabBarLabel: 'Miền Trung',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
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
        headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 15,
        }
    }}>
        <HomeStack.Screen name="Home"  component={HomeScreen} options={{
        title:'Xổ Số Lô Đề Nhanh',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</HomeStack.Navigator>
);

const MienBacStackScreen = ({navigation}) => (
<MienBacStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <MienBacStack.Screen name="Miền Bắc" component={MienBacScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</MienBacStack.Navigator>
);

const MienNamStackScreen = ({navigation}) => (
  <MienNamStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#1f65ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <MienNamStack.Screen name="Miền Nam" component={MienNamScreen} options={{
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
          )
          }} />
  </MienNamStack.Navigator>
  );

const MienTrungStackScreen = ({navigation}) => (
<MienTrungStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <MienTrungStack.Screen name="Miền Trung" component={MienTrungScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</MienTrungStack.Navigator>

);


    