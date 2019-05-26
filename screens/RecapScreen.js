import React from 'react';
import { findIndex } from 'lodash';
import {
  ScrollView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import { ListItem, Button } from 'native-base';
import Salade from '../constants/Salade';
import { StateContext } from '../store';

export default class RecapScreen extends React.Component {
  static navigationOptions = {
    title: 'Votre commande',
  };

  _getLabel(id, collection) {
    const index = findIndex(collection, o => o.id === id);

    if(index !== -1) {
      return collection[index].label;
    }
    return 'n/a';
  }

  _getPrice(id) {
    const index = findIndex(Salade.formula, o => o.id === id);

    if(index !== -1) {
      return Salade.formula[index].price;
    }
    return 'n/a';
  }

  _getTotalPrice(cart = []) {
    const reducer = (accumulator, currentValue) => accumulator + this._getPrice(currentValue.type.id);

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
                const { type, bases, ingredients, toppings, sauces, quantity } = item;
                  return (
                    <React.Fragment key={`${type.id}_${index}`}>
                      <ListItem itemDivider>
                        <Text>{quantity} Salade (<Text style={styles.priceText}>{this._getPrice(type.id)} Dh</Text>)</Text>
                      </ListItem>
                      <ListItem>
                        <Text>Formule : {this._getLabel(type.id, Salade.formula)}</Text>
                      </ListItem>
                      <ListItem>
                        <Text>Bases : { bases.map(base => this._getLabel(base, Salade.bases)).join(', ')}</Text>
                      </ListItem>
                      <ListItem>
                        <Text>Ingrédients: {ingredients.map(ingr => this._getLabel(ingr.id, Salade.ingredients)).join(', ')}</Text>
                      </ListItem>
                      <ListItem>
                        <Text>Toppings: {toppings.map(topp => this._getLabel(topp.id, Salade.toppings)).join(', ')}</Text>
                      </ListItem>
                      <ListItem>
                        <Text>Sauces: {sauces.map(sauce => this._getLabel(sauce, Salade.sauces)).join(', ')}</Text>
                      </ListItem>
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
    flexDirection: 'column'
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0
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