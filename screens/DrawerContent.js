import React, {useState, useEffect}from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    TouchableRipple
} from 'react-native-paper';
import { Container, Header, Content, Button, ListItem, Text,  Left, Body, Right, Switch } from 'native-base';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MyContext } from '../components/mycontext';
import { AuthContext } from '../components/context';

import { openDatabase } from 'react-native-sqlite-storage';

var SQLite = require('react-native-sqlite-storage');

var db = SQLite.openDatabase({ name: 'testDB.db', createFromLocation: '~sqlite_effortless.db' });

export function DrawerContent(props) {

    const paperTheme = useTheme();

    const { signOut, toggleTheme } = React.useContext(AuthContext);

    const { value2 } = React.useContext(MyContext);
    const [stateValue2, setStateValue2] = value2;
    const [imageAvata, setAvata] = useState('https://nhocbi.com/public/static/templates/frontend/xoso/logo.png');
    const [userName, setUserName] = useState('');
    const [fullName, setfullName] = React.useState("");
    useEffect(() => {
        
        getImgAvata();
        getUserInfo();

        db.transaction((tx) => {
            tx.executeSql('INSERT INTO history_dudoan (username, so_dudoan, dai_dudoan_text, dai_dudoan_sub, dai_dudoan, ngay_dudoan) VALUES (?,?,?,?,?,?)', ['gosu', '204', 'Vĩnh Long','VL', 'mientrung', '232323']);
            console.log('ok');
      
        });

    }, []);

    const getImgAvata = async() => {
        let imageAvata = await AsyncStorage.getItem('imageAvata');
        console.log('luan111', imageAvata);
        setAvata(imageAvata)
    }

    const getUserInfo = async() => {
        let fullname = await AsyncStorage.getItem('fullname');
        let username = await AsyncStorage.getItem('userName');
        setfullName(fullname);
        setUserName(username);
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 ,borderBottomWidth: 1, borderBottomColor: '#f2f2f2', paddingBottom: 15}}>
                            <Avatar.Image
                                source={{
                                    uri: stateValue2 ? stateValue2 : imageAvata,
                                }}
                                size={50}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                            <Title style={styles.title}>{fullName}</Title>
                            <Caption style={styles.caption}>{userName}</Caption>
                            </View>
                        </View>

                        {/* <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View>
                        </View> */}
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Trang chủ"
                            onPress={() => { props.navigation.navigate('Home') }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="account-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => { props.navigation.navigate('Profile') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="bookmark-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Lịch sử"
                            onPress={() => { props.navigation.navigate('History') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="settings-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Cài đặt"
                            onPress={() => { props.navigation.navigate('Settings') }}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => { toggleTheme() }}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => { signOut() }}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});