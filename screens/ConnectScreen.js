import React, { Component } from 'react';
import { Facebook } from 'expo';
import { StyleSheet, View, Text, Alert, AsyncStorage } from 'react-native';
import { Content, Form, Item, Input, Icon, Button, Spinner } from 'native-base';
import { config } from '../constants/config';
import { SendCnxFacebook, SendCnxEmail } from '../services';

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
  connectWithFacebook = async () => {
    this.setState({ loading: true });

    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync(config.appId, {
        permissions: ['public_profile', 'email'],
        behavior: 'web'
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const jsonResponse = await response.json();
        const { name, picture, email } = jsonResponse;

        await SendCnxFacebook({ name, picture, email });
        this.props.navigation.navigate('Home');
        Alert.alert('Success !', `Hello ${name}!`);
      } else {
        // type === 'cancel'
        this.setState({ loading: false });
      }
    } catch ({ message }) {
      this.setState({ loading: false });
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  }

  connectWithEmail = async () => {
    const { login, password } = this.state;

    this.setState({ loading: true });
    SendCnxEmail(login, password)
    .then(res => res.json())
    .then(async result => {
      if(result.status === 'fail') {
        console.log(result)
        this.setState({ error: 'Login/Password is incorrect', loading: false});
      } else if(result.status === 'success') {
        await AsyncStorage.setItem('apiTokenId_v1', result.compte.apitoken);
        this.props.navigation.navigate('Home');
      }
    })
    .catch(e => {
      console.log(e);
      this.setState({ error: 'Login/Password is incorrect', loading: false});
    });
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
                value={this.state.login}
                onChangeText={(term) => this.handleChange(term, 'login')}
              />
            </Item>
            <Item>
              <Icon name='eye' />
              <Input 
                placeholder="Password..."
                autoCapitalize='none'
                value={this.state.password}
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
                    onPress={this.connectWithEmail}
                >
                    {
                      this.state.loading ?
                      <Spinner />
                      : <Text style={styles.text}>Se connecter</Text>
                    }
                </Button>
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
        <View style={{ flex: 1 }}>
            <View style={styles.buttonContainer}>
                <Button 
                    style={styles.buttonStyle}
                    success={true}
                    onPress={this.connectWithFacebook}
                >
                    {
                      this.state.loading ?
                      <Spinner />
                      : <Text style={styles.text}>Se connecter avec facebook</Text>
                    }
                </Button>
            </View>
            {<Text style={styles.error}>en cours</Text>}
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