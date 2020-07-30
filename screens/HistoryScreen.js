import React, {useState, useEffect}from 'react';
import { View, Text, Button, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import ListView from 'deprecated-react-native-listview';
import Toast from 'react-native-simple-toast';

var SQLite = require('react-native-sqlite-storage');

var db = SQLite.openDatabase({ name: 'testDB.db', createFromLocation: '~sqlite_effortless.db' });
// var db = openDatabase({ name: 'sqlite_xoso.db', createFromLocation : 1});
const History = () => {

  let [flatListItems, setFlatListItems] = useState([]);
  // var db = openDatabase({ name: 'sqlite_xoso.db' });

  useEffect(() => {
    // var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // setdataSource(ds.cloneWithRows([]));


    db.transaction((tx) => {
      tx.executeSql('SELECT * , MAX(`created`) AS `time` FROM history_dudoan GROUP BY `so_dudoan` ORDER BY `created` DESC ' , [], (tx, results) => {
        
        var len = results.rows.length;//chiều dài của mảng
        if(len>0){
          var temp = [];
            for (let i = 0; i < len; ++i)
              temp.push(results.rows.item(i));
              setFlatListItems(temp);
        }
      });
    });

  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }}
      />
    );
  };

  let listItemView = (item) => {
    return (
      <View
        key={item.user_id}
        style={{
          margin: 5,
          backgroundColor: "#fff",
          borderRadius: 5,
          overflow: "hidden",
          shadowColor: "#000",
          shadowOffset: {
              width: 0,
              height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          padding: 15,
        }}>
        <View style={{flexDirection: 'row'}}><Text style ={styles.dai}>Đài Dự Đoán: </Text><Text style ={styles.text}>{item.dai_dudoan_text}</Text></View>
        <View style={{flexDirection: 'row'}}><Text style ={styles.dai}>Số Dự Đoán: </Text><Text style ={styles.text}>{item.so_dudoan}</Text></View>
        <View style={{flexDirection: 'row'}}><Text style ={styles.dai}>Thời Gian: </Text><Text style ={styles.text}>{item.created}</Text></View>
      </View>
    );
  };

    return (
        
      <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
    );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  dai: {
    
  },
  text: {
    fontWeight: 'bold',
  }
});
