import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import { ListItem, Button } from 'native-base';
import { StateContext } from '../store';

export default class RecapScreen extends React.Component {
  static navigationOptions = {
    title: 'Votre commande',
  };

  _getTotalPrice(cart = []) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.product.price;

    return cart.reduce(reducer, 0);
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
              <Button style={styles.buttonStyle} success onPress={() => {}}>
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