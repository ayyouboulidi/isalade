import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Content, Form, Item, Input, Icon, Button } from 'native-base';

export default class FixedLabelExample extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={{ flex: 1, marginHorizontal: '5%', marginTop: 75 }}>
        <Content>
          <Form>
            <Item>
              <Icon active name='person' />
              <Input placeholder="Login..." />
            </Item>
            <Item>
              <Icon name='eye' />
              <Input placeholder="Password..."/>
            </Item>
          </Form>
        </Content>
        <View style={{ flex: 1 }}>
            <View style={styles.buttonContainer}>
                <Button 
                    style={styles.buttonStyle}
                    info
                    onPress={() => this.props.navigation.navigate('Home')}
                >
                    <Text style={styles.text}>Se connecter</Text>
                </Button>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
      flexDirection: 'row', 
      justifyContent: 'center',
      // position: 'absolute',
      // bottom: 0
  },
  buttonStyle: {
      flex: 1,
      // borderRadius: 0,
      justifyContent: 'center'
  },
  text: {
    fontSize: 14,
    color: '#fff'
  }
});