import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import uuid from 'uuid';
import { getHistory } from '../services';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Historique',
  };

  state = {
    isFocused: false,
    listOrders: []
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.subs = [
      navigation.addListener('didFocus', () => this.setState({ isFocused: true }, () => this.getData())),
      navigation.addListener('willBlur', () => this.setState({ isFocused: false })),
    ];
  }

  componentWillUnmount() {
    if(this.subs) {
      this.subs.forEach(sub => sub.remove());
    }
  }

  getData() {
    getHistory()
      .then(res => res.json())
      .then(result => {
        this.setState({listOrders: result})
      })
      .catch(e => console.error(e));
  }

  render() {
    return (
      <ScrollView styles={styles.container}>
        <Container>
          <Content>
            <List>
              {
                this.state.listOrders.map(order => (
                  <ListItem avatar key={uuid()}>
                    <Left>
                      <Thumbnail source={{ uri: 'https://www.festool.fr/-/media/tts/festool/festool/bilder/wissen/festool-apps/order-app/hero_image_text_400x200px_orderapp_iconshopping.jpg' }} />
                    </Left>
                    <Body>
                      <Text>{order.name}</Text>
                      <Text note>{order.created_at}</Text>
                    </Body>
                    <Right>
                      <Text note>{order.price}</Text>
                    </Right>
                  </ListItem>
                ))
              }
            </List>
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
