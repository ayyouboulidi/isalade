import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Alert
} from 'react-native';
import { ListItem, Button } from 'native-base';
import { StateContext } from '../store';
import { SendCommand } from '../services';

function fomratDate() {
  let d = new Date();
  d = new Date(d.getTime() - 3000000);
  return d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
}

export default class RecapScreen extends React.Component {
  static navigationOptions = {
    title: 'Votre commande',
  };

  _getTotalPrice(cart = []) {
    const defaultQuantity = 1;
    const reducer = (accumulator, currentValue) => accumulator + ( currentValue.quantity || defaultQuantity) * currentValue.product.price;

    return cart.reduce(reducer, 0);
  }

  _validateOrder = (cart = [], value) => {
    const orders = cart.map(item => {
      const { product, order = {}, quantity = 1 } = item;
      const orderList = {
        productTypeId: product.product_type_id,
        productId: product.id,
        quantity,
        ...order
      };

      return orderList;
    });

    SendCommand({
      retreiveDate: fomratDate(),
      orderTypeId: this.props.navigation.state.params.orderTypeId,
      orders: orders
    })
    .then(res => {
      if(res.status === 200) {
        return res.json();
      } else {
        return false
      }
    })
    .then(result => {
      if(result !== false) {
        Alert.alert(
          `Commande ${result.commandnum}`,
          `Merci de votre commande. Veuillez garder le numéro pour pouvoir récuperer votre commande.`,
          [
            {text: 'OK', onPress: () => {}},
          ],
          {cancelable: false},
        );
        value.dispatch({ type: 'RESET_CART' });
        this.props.navigation.navigate('Home', { cart: false });
      } else {
        Alert.alert(
          'Error',
          'please retry or contact the administrator',
          [
            {text: 'OK', onPress: () => {}},
          ],
          {cancelable: false},
        );
      }
    })
    .catch(e => {
      console.error(e);
      Alert.alert(
        'Error',
        'please retry or contact the administrator',
        [
          {text: 'OK', onPress: () => {}},
        ],
        {cancelable: false},
      );
    });
  }

  render() {
    return (<StateContext.Consumer>
      {
        value => (
          <View style={styles.container}>
            <ScrollView>
            {
              value.state.cart.map((item, index) => {
                const { product, order, quantity = 1, componentsList = [] } = item;
                  return (
                    <React.Fragment key={`${product.id}_${index}`}>
                      <ListItem itemDivider>
                        <Text>{quantity} {product.name} (<Text style={styles.priceText}>{product.price} Dh</Text>)</Text>
                      </ListItem>
                      <ListItem>
                        <Text>Formule : {product.description}</Text>
                      </ListItem>
                      {
                        componentsList.map(category => (
                          <ListItem key={`categories_${category.id}`}>
                            <Text>
                              {
                                `${category.label.capitalize()} : ${order[category.id]
                                  .map(cat => {
                                    if(cat.quantity > 1) {
                                      return `${cat.name.capitalize()} (x ${cat.quantity})`
                                    } 
                                    return cat.name.capitalize()
                                  }).join(', ')
                                }`
                              }
                            </Text>
                          </ListItem>
                        ))
                      }
                    </React.Fragment>
                  )
                })
              }
            </ScrollView>
            <View style={styles.buttonContainer}>
              <Button style={styles.buttonStyle} success onPress={() => this._validateOrder(value.state.cart, value)}>
                  <Text style={styles.text}>Valider la commande ({this._getTotalPrice(value.state.cart)} DH)</Text>
              </Button>
            </View>
          </View>
      )}
      </StateContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    paddingTop: 50
  },
  priceText: {
    color: 'green',
  },
  text: {
    fontSize: 14,
    color: '#fff'
  },
  buttonStyle: {
      flex: 1,
      borderRadius: 0,
      justifyContent: 'center'
  },
});