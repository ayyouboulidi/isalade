import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import { Button } from 'native-base';
import Card from '../components/Card';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Card categoryName="Salade" navigateTo={() => this.props.navigation.navigate('OrderType', {categoryName: "Salade"})}/>
          <Card categoryName="Sandwich" navigateTo={() => this.props.navigation.navigate('Static', {categoryName: "Sandwich"})}/>
          <Card categoryName="Desserts" navigateTo={() => this.props.navigation.navigate('Static', {categoryName: "Desserts"})}/>
          <Card categoryName="Boissons" navigateTo={() => this.props.navigation.navigate('Static', {categoryName: "Boissons"})}/>
          <Card categoryName="Plats" navigateTo={() => this.props.navigation.navigate('Static', {categoryName: "Plats"})}/>
        </ScrollView>
        {
          ((((this.props || {}).navigation || {}).state || {}).params || {}).cart ?
          <View style={{ flex: 1, paddingTop: 50 }}>
              <View style={styles.buttonContainer}>
                  <Button 
                      style={styles.buttonStyle}
                      success
                      onPress={() => this.props.navigation.navigate('Recap', {...this.props.navigation.state.params.cart})}
                  >
                      <Text style={styles.text}>Passer la commande</Text>
                  </Button>
              </View>
          </View>
          : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 30,
    flex: 1
  },
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
},
});
