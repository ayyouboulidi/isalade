import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import { Button, Spinner } from 'native-base';
import Card from '../components/Card';
import { getAllProductsTypes } from '../services';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    products : [],
    loading: true,
  }

  componentDidMount() {
    getAllProductsTypes()
      .then(res => res.json())
      .then(products => {
        this.setState({ products, loading: false });
      })
      .catch(e => console.error(e));
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        {
          this.state.loading
          ? <Spinner />
          : <ScrollView contentContainerStyle={styles.contentContainer}>
            {
              this.state.products.map(product => (
                <Card 
                  key={product.id}
                  id={product.id}
                  theme='products_types'
                  productName={product.name}
                  productDescription={product.description}
                  productImage={product.img_path}
                  navigateTo={() => {
                    this.props.navigation.navigate('OrderType', { 
                      productName:  product.name,
                      productId:  product.id 
                    })
                  }}
                />
              ))
            }
          </ScrollView>
        }
        {
          ((((this.props || {}).navigation || {}).state || {}).params || {}).cart ?
            <View style={styles.buttonContainer}>
                <Button 
                    style={styles.buttonStyle}
                    success
                    onPress={() => this.props.navigation.navigate('Recap')}
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
  label: {
    textTransform: 'capitalize',
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
