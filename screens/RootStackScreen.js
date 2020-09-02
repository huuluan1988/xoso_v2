import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
// import {useNavigation} from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './DrawerContent';

import MainTabScreen from './MainTabScreen';
import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();
// const navigation = useNavigation();

const RootStackScreen = ({}) => (
    <Drawer.Navigator headerMode='none' drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen}/>
        <Drawer.Screen name="SplashScreen" component={SplashScreen}/>
        <Drawer.Screen name="SignInScreen" component={SignInScreen}/>
        <Drawer.Screen name="SignUpScreen" component={SignUpScreen}/>
    </Drawer.Navigator>
);

export default RootStackScreen;

