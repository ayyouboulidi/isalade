import React from 'react';
import { cloneDeep } from 'lodash';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ListItem, CheckBox, Text, Body, Spinner, Button } from 'native-base';
import { StateContext } from '../store';
import { getListProducts } from '../services';


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Static Screen Under Dev',
    };

    constructor(props, context) {
        super(props, context);
  
        this.state = {
            productsList: [],
            products: [],
            quantity: 1,
            loading: true
        }
    }

    _handleProductPress = (product) => {
        const index = this.state.products.findIndex(o => o.id === product.id);
        const products = cloneDeep(this.state.products);

        if(index > -1) {
            products.splice(index, 1);

            this.setState({ products })
        } else {
            products.push(product);
            this.setState({ products });
        }
    }

    componentDidMount() {
        if(this.props.navigation.state.params.productId) {
            getListProducts(this.props.navigation.state.params.productId)
            .then(res => res.json())
            .then(productsList => {
                this.setState({ 
                    productsList, 
                    loading: false 
                });
            })
            .catch(e => console.error(e));
        }
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <ScrollView>
                    <ListItem itemDivider>
                        <Text>{this.props.navigation.state.params.productName.capitalize()}</Text>
                    </ListItem>
                    {
                        this.state.loading ?
                        <Spinner />
                        : this.state.productsList.map(product => (
                            <ListItem 
                                key={`product_${product.id}`}
                                onPress={() => {this._handleProductPress(product)}}
                            >
                                <CheckBox 
                                    checked={this.state.products.findIndex(o => o.id === product.id) > -1}
                                    onPress={() => {this._handleProductPress(product)}}
                                />
                                <Body style={styles.formuleBody}>
                                    <Text>{product.name.capitalize()}</Text>
                                    <Text style={styles.priceText}>{product.price} Dhs</Text>
                                </Body>
                            </ListItem>
                        ))
                    }
                </ScrollView>
                <View style={{ flex: 1, paddingTop: 50 }}>
                    <View style={styles.buttonContainer}>
                        <StateContext.Consumer>
                            { value => (<Button 
                                  style={styles.buttonStyle}
                                  success={this.state.products.length > 0} 
                                  disabled={!this.state.products.length > 0} 
                                  onPress={() => {
                                          if(this.state.products.length) {
                                              this.props.navigation.navigate('Home', { cart: true })}
                                              this.state.products.forEach(product => {
                                                  value.dispatch({
                                                      type: 'ADD_TO_CART',
                                                      cartItem: { product }
                                                  })
                                              })
                                          }
                                  }
                              >
                                  <Text style={styles.text}>Ajouter au panier</Text>
                              </Button>)
                            }
                        </StateContext.Consumer>
                    </View> 
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    priceText: {
        color: 'green',
        fontSize: 11,
        flex: 1,
        alignSelf: 'center',
        alignItems: 'flex-end',
        textAlign: 'right'
    },
    buttonStyle: {
        flex: 1,
        borderRadius: 0,
        justifyContent: 'center'
    },
    text: {
        fontSize: 12
    },
    buttonContainer: {
        flexDirection: 'row', 
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0
    },
    formuleBody: {
        flex: 1, 
        flexDirection: 'row'
    },
});