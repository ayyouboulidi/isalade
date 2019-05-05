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
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Card 
            categoryName="Salade"
            id="salade"
            navigateTo={() => 
              this.props.navigation.navigate('OrderType', {categoryName: "Salade" })
            }
          />
          <Card 
            categoryName="Sandwich"
            id="sandwich"
            navigateTo={() => 
              this.props.navigation.navigate('Static', { categoryName: "Sandwich" })
            }
          />
          <Card 
            categoryName="Pizza"
            id="pizza"
            navigateTo={() => 
              this.props.navigation.navigate('Static', { categoryName: "Pizza" })
            }
          />
          <Card 
            categoryName="Crêpes"
            id="crepes"
            navigateTo={() => 
              this.props.navigation.navigate('Static', { categoryName: "Crêpes" })
            }
          />
          <Card 
            categoryName="Plats"
            id="plats"
            navigateTo={() => 
              this.props.navigation.navigate('Static', { categoryName: "Plats" })
            }
          />
          <Card 
            categoryName="Plats"
            id="plats"
            navigateTo={() => 
              this.props.navigation.navigate('Static', { categoryName: "Plats" })
            }
          />
          <Card 
            categoryName="Plats"
            id="plats"
            navigateTo={() => 
              this.props.navigation.navigate('Static', { categoryName: "Plats" })
            }
          />
          <Card 
            categoryName="Plats"
            id="plats"
            navigateTo={() => 
              this.props.navigation.navigate('Static', { categoryName: "Plats" })
            }
          />
          <Card 
            categoryName="Plats"
            id="plats"
            navigateTo={() => 
              this.props.navigation.navigate('Static', { categoryName: "Plats" })
            }
          />
        </ScrollView>
        {
          ((((this.props || {}).navigation || {}).state || {}).params || {}).cart ?
            <View style={styles.buttonContainer}>
                <Button 
                    style={styles.buttonStyle}
                    success
                    onPress={() => this.props.navigation.navigate('Recap', {...this.props.navigation.state.params.cart})}
                >
                    <Text style={styles.text}>Passer la commande</Text>
                </Button>
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
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 40,
  },
  text: {
    fontSize: 14,
    color: '#fff'
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
