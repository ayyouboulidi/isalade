import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { getUserProfile } from '../services';
export default class ListAvatarExample extends Component {
  static navigationOptions = {
    title: 'Profil',
  };

  state = {
    img_path: '',
    name: '',
    email: '',
    phone: ''
  }

  componentDidMount() {
    getUserProfile()
      .then(res => res.json())
      .then(result => {
        this.setState({
          ...result
        })
      })
      .catch(e => console.error(e));
  }
  render() {
    const { img_path, name, email, phone } = this.state;
    return (
      <Container>
        <Content>
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: img_path || 'https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png' }} />
              </Left>
              <Body>
                <Text>{name}</Text>
                <Text note>{email}</Text>
              </Body>
              <Right>
                <Text note>{phone}</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}