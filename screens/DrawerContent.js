import React, {useState, useEffect}from 'react';
import { View, StyleSheet, Share, Linking } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer
} from 'react-native-paper';
import { Container, Header, Content, Button, ListItem, Text,  Left, Body, Right, Switch } from 'native-base';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import { MyContext } from '../components/mycontext';
import { AuthContext } from '../components/context';

// import SignInScreen from './SignInScreen';

export function DrawerContent(props) {

    const paperTheme = useTheme();

    const { signOut, toggleTheme } = React.useContext(AuthContext);

    const { avataUser } = React.useContext(MyContext);
    const [stateAvataUser, setStateAvataUser] = avataUser;
    const { fullNameUser } = React.useContext(MyContext);
    const [stateFullNameUser, setStateFullNameUser] = fullNameUser;

    const [imageAvata, setAvata] = useState('https://nhocbi.com/public/static/templates/frontend/xoso/logo.png');
    const [userName, setUserName] = useState('');
    const [fullName, setfullName] = React.useState("");
    useEffect(() => {
        
        getUserInfo();
    }, []);

    const getUserInfo = async() => {
        let fullname = await AsyncStorage.getItem('fullname');
        let username = await AsyncStorage.getItem('userName');
        let imageAvata = await AsyncStorage.getItem('imageAvata');
        setfullName(fullname);
        setUserName(username);
        setAvata(imageAvata);
    }

    const _shareTextMessage = async() => {
        props.navigation.closeDrawer();
        Share.share({
            message: 'Vui lòng chia sẽ ứng dụng nếu bạn thấy hay!'
          })
          .then(this._showResult)
          .catch(err => console.log(err))
    }

    const _referenceApps =() => {
        url = "https://play.google.com/store/apps/details?id=com.huuluan.xoso";
        Linking.openURL(url).catch(() => this.dropdown.alertWithType("error", "Sorry!", "Could not open"));
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
      }

    const _website =() => {
        url = "https://www.facebook.com/groups/soxo.lode";

        Linking.openURL(url).catch(() => this.dropdown.alertWithType("error", "Sorry!", "Could not open"));
        props.navigation.closeDrawer();
      }

    const capitalize =(str) => {
        if (!str == '') {
            return str.charAt(0).toUpperCase();
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 15 ,borderBottomWidth: 1, borderBottomColor: '#f2f2f2', paddingBottom: 15}}>
                            <Avatar.Image
                                source={{
                                    uri: stateAvataUser ? stateAvataUser : imageAvata ? imageAvata :  'https://nhocbi.com/public/static/templates/frontend/xoso/logo.png',
                                }}
                                size={50}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                            <Title style={styles.title}>{stateFullNameUser ? stateFullNameUser : fullName ? fullName : 'Dò Xổ Số - Lô Đề'}</Title>
                            <Caption style={styles.caption}>{userName ? userName : 'Nhanh nhất trong ngày'}</Caption>
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

                        {userName ? <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="account-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => { props.navigation.navigate('Profile') }}
                        /> : null }
                        {userName ? <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="history"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Lịch sử"
                            onPress={() => { props.navigation.navigate('History') }}
                        /> : null }
                        <DrawerItem
                            icon={({ color, size }) => (
                                <IconMaterial
                                    name="rate-review"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Đánh giá ứng dụng"
                            onPress={() => { _referenceApps() }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <IconMaterial
                                    name="share"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Chia sẻ"
                            onPress={() => { _shareTextMessage() }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="web"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Fanpage"
                            onPress={() => { _website() }}
                        />

                        </Drawer.Section>

                        
                    {/* <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => { toggleTheme() }}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section> */}
                </View>
            </DrawerContentScrollView>
            {userName ? <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Thoát"
                    onPress={() => { signOut() }}
                />
            </Drawer.Section> : 
            <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem
                icon={({ color, size }) => (
                    <Icon
                        name="exit-to-app"
                        color={color}
                        size={size}
                    />
                )}
                label="Đăng nhập"
                onPress={() => { props.navigation.navigate('SignInScreen') }}
            />
        </Drawer.Section> }
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