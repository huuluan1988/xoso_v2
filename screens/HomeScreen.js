import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Dimensions, Image, ScrollView, FlatList, Text} from 'react-native';
import {Block, Button, TextView} from '../components';
import {Colors} from '../components/color';
import Feather from 'react-native-vector-icons/Feather';

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

const ItemField = ({icon, title, desc, tyle, link}) => {
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
        
        <Image style={styles.img_item} resizeMode="contain" source={icon} />
        <Block padding={10} style={styles.field_con}>
          <TextView size={16} bold>
            {title}
          </TextView>
          {/* <TextView style={styles.textDesc}>Tỷ : {desc}</TextView> */}
          <TextView style={styles.textDesc}>Tỷ lệ trúng: {tyle}</TextView>
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
  useEffect(() => {
    load();

  }, []);

  const load = () => {
    fetch("https://nhocbi.com/tienganh/category_effortlessenglish_v3/json_category_effortlessenglish", {
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    }).then(res => res.json())
      .then(data => {
        setDataSource(data);
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
          <TextView h6>Số dự đoán hôm nay</TextView>
          <Block direction="row" paddingVertical={10}>
          <ScrollView>
            <FlatList
              data={dataSource}
              horizontal
              renderItem={({ item }) => (
                <View>
                  <Item somoinhat={item.image_width} dai={item.word}/>
                </View>
              )}
            />

          </ScrollView>
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
            <ItemField
            
              title="Miền Bắc"
              desc="12"
              tyle="30%"
              link="MienBac"
              navigate='navigate'
              icon={require('../assets/img-bac.jpg')}
            />
            <ItemField
              title="Miền Nam"
              desc="12"
              tyle="30%"
              link="MienNam"
              icon={require('../assets/img-nam.jpg')}
            />
            <ItemField
              title="Miền Trung"
              desc="12"
              tyle="30%"
              link="MienTrung"

              icon={require('../assets/img-trung.jpg')}
            />
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
    width: (2 * W) / 5,
    left: W / 3 + 10,
    top: 10,
    paddingVertical: 10,
  },
  textDesc: {
    lineHeight: 20,
    marginTop: 10,
    maxWidth: (2 * W) / 3.4,
  },
  btn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});