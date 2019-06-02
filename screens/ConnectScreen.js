import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Content, Form, Item, Input, Icon, Button } from 'native-base';

export default class FixedLabelExample extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      error: null
    }
  }

  handleChange = (val, key) => {
    this.setState({ [key]: val, error: null });
  }

  // web service here to auth the user
  connect = () => {
    const { login, password } = this.state;
    if(login === 'a@a.com' && password === 'a') {
      this.props.navigation.navigate('Home');
    }
    else {
      this.setState({ error: 'Login/Password is incorrect'});
    }
  }

  render() {
    const { error } = this.state;
    return (
      <View style={{ flex: 1, marginHorizontal: '5%', marginTop: 75 }}>
        <Content>
          <Form>
            <Item>
              <Icon active name='person' />
              <Input 
                placeholder="Login..." 
                autoCapitalize='none'
                onChangeText={(term) => this.handleChange(term, 'login')}
              />
            </Item>
            <Item>
              <Icon name='eye' />
              <Input 
                placeholder="Password..."
                autoCapitalize='none'
                onChangeText={(term) => this.handleChange(term, 'password')}
                secureTextEntry
              />
            </Item>
          </Form>
        </Content>
        <View style={{ flex: 1 }}>
            <View style={styles.buttonContainer}>
                <Button 
                    style={styles.buttonStyle}
                    info={error ? false : true}
                    danger={error ? true : false}
                    onPress={this.connect}
                >
                    <Text style={styles.text}>Se connecter</Text>
                </Button>
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
      flexDirection: 'row', 
      justifyContent: 'center',
  },
  buttonStyle: {
      flex: 1,
      justifyContent: 'center'
  },
  text: {
    fontSize: 14,
    color: '#fff'
  },
  error: {
    fontSize: 14,
    textAlign: 'center',
    color: '#ff0000'
  }
});