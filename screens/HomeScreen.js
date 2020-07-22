import React, {useState, useEffect}from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';

const HomeScreen = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();
  const [state1, setState1] = useState([])

  useEffect(() => {
      
    // async function fetchData() {
    //   const res = await fetch("https://hn.algolia.com/api/v1/search?query=redux")
    //   res
    //     .json()
    //     .then(res => setState1(res.hits))
    //     .catch(err => console.log('2',err ));
    // }

    // fetchData();

}, []);


    return (
      <Container>
        <Content>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="bluetooth" />
              </Button>
            </Left>
            <Body>
              <Text>Bluetooth</Text>
            </Body>
            <Right>
              <Text>On</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>

          <View>
            {/* {state1.map((r, id) => (
              <Text>{r.author}</Text>
            ))} */}
          </View>
        </Content>
      </Container>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
