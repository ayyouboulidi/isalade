import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import { ListItem } from 'native-base';

export default class RecapScreen extends React.Component {
  static navigationOptions = {
    title: 'Récapitulatif',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <ListItem itemDivider>
          <Text>Formule</Text>
        </ListItem>
        <Text>{this.props.navigation.state.params.type}</Text>
        <ListItem itemDivider>
          <Text>Base</Text>
        </ListItem>
        {
          this.props.navigation.state.params.base.map(base => (<Text key={base}>{base}</Text>))
        }
        <ListItem itemDivider>
          <Text>Ingrédients</Text>
        </ListItem>
        {
          this.props.navigation.state.params.ingredients.map(ingr => (<Text key={ingr}>{ingr}</Text>))
        }
        <ListItem itemDivider>
          <Text>Toppings</Text>
        </ListItem>
        {
          this.props.navigation.state.params.toppings.map(topp => (<Text key={topp}>{topp}</Text>))
        }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
});
