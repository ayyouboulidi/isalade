import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Header, Content, Form, Item, Input, Label, Button } from 'native-base';

export default class FixedLabelExample extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item fixedLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
          </Form>
        </Content>
        <View style={{ flex: 1 }}>
            <View style={styles.buttonContainer}>
                <Button 
                    style={styles.buttonStyle}
                    onPress={() => this.props.navigation.navigate('Home')}
                >
                    <Text>Suivant</Text>
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
      position: 'absolute',
      bottom: 0
  },
  buttonStyle: {
      flex: 1,
      borderRadius: 0,
      justifyContent: 'center'
  }
});