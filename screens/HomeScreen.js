import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Dimensions, Image, ScrollView, FlatList, Text} from 'react-native';
import {Block, Button, TextView} from '../components';
import {Colors} from '../components/color';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native'

const W = Dimensions.get('window').width;


const Item = ({somoinhat, dai}) => {
  return (
    <Block block centered>
      <Button middle shadow color="#fff" padding={15} borderRadius={12}>
        <TextView>{somoinhat}</TextView>
        <TextView bold center>
          {dai}
        </TextView>
      </Button>
    </Block>
  );
};

const ItemField = ({image, title, total_du_doan, total_du_doan_trung, link}) => {
  const navigation = useNavigation();
  return (
    <Button onPress={() => {
      navigation.navigate(link)
    }}>
      <Block
        direction="row"
        borderRadius={10}
        shadow
        color="#fff"
        padding={6}
        paddingHorizontal={10}
        style={{marginTop: 10}}>
        
        <Image style={styles.img_item} resizeMode="contain" source={{uri:image}} />
        <Block padding={10} style={styles.field_con}>
          <TextView size={16} bold>
            {title}
          </TextView>
          <TextView style={styles.textDesc}>Số lần dự đoán : {total_du_doan}</TextView>
          <TextView style={styles.textDesc}>Tỷ lệ trúng: {((total_du_doan_trung * 100) / total_du_doan).toFixed(2)} %</TextView>
        </Block>
        <Button style={styles.btn}>
          <Feather name="chevron-right" color={Colors.blue} size={30} />
        </Button>
      </Block>
    </Button>
  );
};

const HomeScreen = (navigate) => {

  const [dataSource, setDataSource] = useState([]);
  const [dataSourceMien, setDataSourceMien] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    load();
    loadTyleDuDoan();
    getUser();
    loadUser();

    
  }, []);

  const getUser = async() => {
    let username = await AsyncStorage.getItem('userName');
    setUserName(username)
  }

  const load = async() => {
    let username = await AsyncStorage.getItem('userName');
    
    fetch("http://nhocbi.com/xoso/list_so_dudoan?username=" + username, {
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    }).then(res => res.json())
      .then(data => {
        if(data == ''){
          setDataSource();
        } else {
          setDataSource(data);
        };
        
      });
  }

  const loadUser = async() => {
    let username = await AsyncStorage.getItem('userName');
    fetch("http://nhocbi.com/xoso/list_user?username=" + username, {
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    }).then(res => res.json())
      .then(data => {
        data.map(v=>{
          setUserName(v.fullname);
       })
      });
  }

  const loadTyleDuDoan = async(v) => {
    let username = await AsyncStorage.getItem('userName');
    // fetch("http://nhocbi.com/xoso/tyle_du_doan" + '?username=' + username + '&kg_mien=' + v,  {
      console.log('username',username);
      fetch("http://nhocbi.com/xoso/tyle_du_doan?username=" + username,  {
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    }).then(res => res.json())
      .then(data => {
        if(data == ''){
          setDataSourceMien()
        } else {
          setDataSourceMien(data)
        };
      });
  }

  return (
    <ScrollView style={{flex: 1}}>
      <Block block color="#fafafa">
        {/* <Block height={300} color={Colors.blue} style={styles.bg}>
          <Block style={styles.wrapperimage}>
            <Image
              style={styles.doctor}
              source={require('../assets/logo.png')}
            />
          </Block>
        </Block>
        <Block style={styles.containerHeader}>
          <Image style={styles.img} source={require('../assets/virus.png')} />
        </Block> */}
        
        <Block padding={10}>
          <TextView h6>Số dự đoán hôm nay:</TextView>
          <Block direction="row" paddingVertical={10}>
          {!dataSource ? <TextView >Bạn chưa tham gia dự đoán ngày hôm nay!</TextView>   : <ScrollView>
            <FlatList
              data={dataSource}
              horizontal
              renderItem={({ item }) => (
                <View>
                  <Item somoinhat={item.so_dudoan} dai={item.dai_dudoan_text}/>
                </View>
              )}
            />
          </ScrollView> }
            {/* <Item somoinhat="3/8" dai="Miền Bắc" />
            <Block width={10} />
            <Item somoinhat="09856" dai="Miền Bắc" />
            <Block width={10} />
            <Item somoinhat="742" dai="Miền Bắc" />
            <Block width={10} />
            <Item somoinhat="742" dai="Miền Bắc" /> */}
          </Block>
        </Block>
        <Block padding={10}>
          <TextView h6>Xổ Số 3 Miền</TextView>
          <Block>
          <FlatList
              data={dataSourceMien}
              renderItem={({ item }) => (
                <ItemField
                  title={item.mien}
                  total_du_doan={item.tong}
                  total_du_doan_trung={item.tong_trung}
                  link={item.link}
                  navigate='navigate'
                  image= {item.image}
                />
              )}
            />
            {/* <ItemField
              title="Miền Bắc"
              total_du_doan={totalDuDoan}
              total_du_doan_trung={totalDuDoanTrung}
              link="MienBac"
              navigate='navigate'
              icon={require('../assets/img-bac.jpg')}
            />
            <ItemField
              title="Miền Nam"
              total_du_doan={totalDuDoan}
              total_du_doan_trung={totalDuDoanTrung}
              link="MienNam"
              icon={require('../assets/img-nam.jpg')}
            />
            <ItemField
              title="Miền Trung"
              total_du_doan={totalDuDoan}
              total_du_doan_trung={totalDuDoanTrung}
              link="MienTrung"

              icon={require('../assets/img-trung.jpg')}
            /> */}
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 300,
  },
  doctor: {
    position: 'absolute',
    top: 100,
    left: -30,

    // width: 50,
    // height: 80,
  },
  wrapperimage: {
    position: 'absolute',
    bottom: 0,

    alignSelf: 'center',
    width: W,
    height: 300,
  },
  bg: {
    position: 'absolute',
    width: 1000,
    height: 1000,
    top: -(930 - W / 2),
    alignSelf: 'center',
    // top: 500 - W / 2,
    // left: 500 - W / 2,
    borderRadius: 1000,
    overflow: 'hidden',
  },
  containerHeader: {
    position: 'relative',
  },
  map: {
    borderRadius: 8,
    marginTop: 15,
    padding: 15,
  },

  img_item: {
    width: (1.2 * W) / 5,
    height: (1.2 * W) / 5,
  },
  field_con: {
    // marginLeft: W / 2,
    position: 'absolute',
    width: (2 * W),
    left: W / 3 + 10,
    top: 10,
    paddingVertical: 10,
  },
  textDesc: {
    lineHeight: 15,
    marginTop: 5,
    maxWidth: (2 * W) / 3.4,
  },
  btn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});