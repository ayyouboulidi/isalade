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

  render() {
    const { type, base, ingredients, toppings } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <ScrollView>
          <ListItem itemDivider>
            <Text>Salade (<Text style={styles.priceText}>{this._getPrice(type)} Dh</Text>)</Text>
          </ListItem>
          <ListItem>
            <Text>Formule : {this._getLabel(type, Salade.formula)}</Text>
          </ListItem>
          <ListItem>
            <Text>Base : {
              base.map(base => (<Text key={base}>, {this._getLabel(base, Salade.bases)}</Text>))
            }</Text>
          </ListItem>
          <ListItem>
            <Text>Ingrédients: {
              ingredients.map(ingr => (<Text key={ingr}>, {this._getLabel(ingr, Salade.ingredients)}</Text>))
            }</Text>
          </ListItem>
          <ListItem>
            <Text>Toppings: {
              toppings.map(topp => (<Text key={topp}>, {this._getLabel(topp, Salade.toppings)}</Text>))
            }</Text>
          </ListItem>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button 
              style={styles.buttonStyle}
              success
              onPress={() => {}}
          >
              <Text style={styles.text}>Valider la commande ({this._getPrice(type)} Dh)</Text>
          </Button>
        </View>
      </View>
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