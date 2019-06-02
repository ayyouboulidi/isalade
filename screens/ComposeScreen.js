import React from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { ListItem, CheckBox, Text, Body, Spinner, Button } from 'native-base';
import { cloneDeep } from 'lodash';
import Counter from '../components/Counter';
import { StateContext } from '../store';
import { getListProducts, getAllComponentsTypes, getListComponents } from '../services';

export default class ComposeScreen extends React.Component {
    static navigationOptions = {
        title: 'Composez votre salade',
    };

    constructor(props, context) {
      super(props, context);

      this.state = {
          productsList: [],
          componentsList: [],
          components: {},
          product: {},
          order: {},
          loadingProducts: false,
          loadingComponents: false,
          quantity: 1
      }
    }

    componentDidMount() {
        if(this.props.navigation.state.params.productId) {
            this.setState({ loadingProducts: true });
            Promise.all([
                getListProducts(this.props.navigation.state.params.productId),
                getAllComponentsTypes()
            ])
            .then(async res => Promise.all(res.map(v => v.json())))
            .then(results => {
                this.setState({ 
                    productsList:  results[0], 
                    componentsList: results[1],
                    loadingProducts: false 
                });
                this._loadComponents(results[1]);
            })
            .catch(e => console.error(e));
        }
    }

    _loadComponents(componentsList) {
      const promise = componentsList.map(component => getListComponents(component.id));
           
      Promise.all(promise)
      .then(async res => Promise.all(res.map(v => v.json())))
      .then(results => {
          const components = {};
          results.forEach((res, index) => {
              components[componentsList[index].id] = res;
          });
          
          this.setState({ components, loadingComponents: false });
      })
      .catch(e => console.error(e));
    }

    _handleProductPress = (product) => {
        if(Object.keys(this.state.components).length) {
            this.setState({ product });
        } else {
            this.setState({ product, loadingComponents: true });
            this._loadComponents(this.state.componentsList);          
        }
    }

    _handleSelect = (componentTypeId, component, quantity = 1, maxCount) => {
        const maxKey = componentTypeId === 2 ? 'max_ingredients' : componentTypeId === 3 ? 'max_toppings' : null;

        if(this.state.order[componentTypeId]) {
            const index = this.state.order[componentTypeId].findIndex(o => o.id === component.id);
            const orderByComponent = cloneDeep(this.state.order[componentTypeId]);

            if(index > -1 ) {
                orderByComponent.splice(index, 1);
                this.setState({ 
                    order: { 
                        ...this.state.order, 
                        [componentTypeId]: orderByComponent 
                    } 
                });
            } else {
                orderByComponent.push({ ...component, quantity });
                this._addComponent(maxKey, maxCount, componentTypeId, orderByComponent);
            }
        } else {
            this._addComponent(maxKey, maxCount, componentTypeId, [{ ...component, quantity }]);
        }
    }

    _addComponent(maxKey, maxCount, componentTypeId, orderByComponent) {
      if(!this._isMaxReached(maxKey, maxCount)) {
        this.setState({ 
            order: { 
                ...this.state.order, 
                [componentTypeId]: orderByComponent 
            } 
         });
      }
    }

    _isMaxReached = (maxKey, count) => {
        if(!maxKey) return false;

        if(count < this.state.product[maxKey]) {
            return false;
        } else if(count >= this.state.product[maxKey]) {
            Alert.alert(
                'Maximum atteint',
                this.state.product.description,
                [
                  {text: 'OK', onPress: () => {}},
                ],
                {cancelable: false},
              );
            return true;
        }
    }

    formuleIsValid = () => {
        return !!this.state.product.id && Object.keys(this.state.components).length > 0;
    }

    countSelectedCountableComponents(orderByComponent) {
        const reducer = (accumulator, currentValue) => accumulator + currentValue.quantity;
        return (orderByComponent || []).reduce(reducer, 0);
    }

    onChangeQuantityComponent = (quantity, componentTypeId, componentId) => {
        const maxKey = componentTypeId === 2 ? 'max_ingredients' : componentTypeId === 3 ? 'max_toppings' : null;
        const index = this.state.order[componentTypeId].findIndex(o => o.id === componentId);
        const orderByComponent = cloneDeep(this.state.order[componentTypeId]);
        orderByComponent[index].quantity = quantity;
        const count = this.countSelectedCountableComponents(orderByComponent);
        
        if(!this._isMaxReached(maxKey, count-1)) {
          this.setState({ order: { 
              ...this.state.order, 
              [componentTypeId]: orderByComponent 
            }  
          });
        }
    }

    onChangeQuantity = (quantity) => {
        this.setState({ quantity });
    }

    composeIsValid = () => {
      let valid = true;
      this.state.componentsList.forEach(component => {
        if((this.state.order[component.id] || []).length === 0) {
          valid = false;
        }
      });

      return this.state.product.id && valid;
    }

    render() {
        const { productsList, product, order, componentsList, components, loadingProducts, loadingComponents } = this.state;

        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <ScrollView>
                    <ListItem itemDivider>
                        <Text>Formule</Text>
                    </ListItem>
                    {
                        loadingProducts ?
                        <Spinner />
                        : productsList.map(menu => (
                            <ListItem 
                                key={`menu_${menu.id}`}
                                onPress={() => this._handleProductPress(menu)}
                            >
                                <CheckBox 
                                    checked={product.id === menu.id} 
                                    onPress={() => this._handleProductPress(menu)}
                                />
                                <Body style={styles.formuleBody}>
                                    <Text>{menu.name.capitalize()}</Text>
                                    <Text style={styles.priceText}>{menu.price} Dhs</Text>
                                </Body>
                            </ListItem>
                        ))
                    }
                    {
                      componentsList.map(componentList => {
                        const count = this.countSelectedCountableComponents(order[componentList.id]);
                        return <React.Fragment key={`componentList_${componentList.id}`}>
                            <ListItem itemDivider>
                                <Text>
                                    {componentList.label.capitalize()} 
                                    {
                                        this.formuleIsValid() && componentList.id === 2 ?
                                        ` (${count}/${product.max_ingredients})`
                                        : this.formuleIsValid() && componentList.id === 3 ?
                                        ` (${count}/${product.max_toppings})`
                                        : null
                                    }
                                </Text>
                            </ListItem>
                            {
                              loadingComponents ?
                              <Spinner />
                              : this.formuleIsValid() &&
                                components[componentList.id].map(component => (
                                    <ListItem 
                                        key={`component_${component.id}`}
                                        onPress={() => this._handleSelect(
                                            componentList.id, 
                                            component, 
                                            1, 
                                            count
                                          )
                                        }
                                    >
                                        <CheckBox 
                                            checked={!!(order[componentList.id] || []).find(o => o.id === component.id)} 
                                            onPress={() => this._handleSelect(
                                                componentList.id, 
                                                component, 
                                                1,
                                                count
                                              )
                                            }
                                        />
                                        <Body style={component.extra && styles.formuleBody}>
                                            <Text>{component.name.capitalize()}</Text>
                                            {component.extra ? <Text style={styles.suppText}>+6 Dh</Text> : null}
                                        </Body>
                                        {
                                            (componentList.id === 2 || componentList.id === 3)
                                            && !!(order[componentList.id] || []).find(o => o.id === component.id) ?
                                            <Counter 
                                                start={1}
                                                min={1}
                                                disabled={
                                                  componentList.id === 2 ?
                                                    product.max_ingredients === count
                                                    : componentList.id === 3 ?
                                                      product.max_toppings === count
                                                      : false
                                                }
                                                onChange={(number) => this.onChangeQuantityComponent(number, componentList.id, component.id)} 
                                            />: null
                                        }
                                    </ListItem>
                                ))
                            }
                        </React.Fragment>
                      })
                    }
                    <View style={styles.quantityContainer}>
                        <Counter 
                            start={1}
                            min={1}
                            onChange={(number) => this.onChangeQuantity(number)} 
                        />
                    </View>
                </ScrollView>
                <View style={{ flex: 1, paddingTop: 50 }}>
                    <View style={styles.buttonContainer}>
                        <StateContext.Consumer>
                            { value => (<Button 
                                  style={styles.buttonStyle}
                                  success={this.composeIsValid()} 
                                  disabled={!this.composeIsValid()} 
                                  onPress={() => {
                                          if(this.composeIsValid()) {
                                              this.props.navigation.navigate('Home', { cart: true })}
                                              value.dispatch({
                                                  type: 'ADD_TO_CART',
                                                  cartItem: { 
                                                      product: this.state.product,
                                                      order: this.state.order,
                                                      componentsList: this.state.componentsList,
                                                      quantity: this.state.quantity
                                                  }
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
    buttonContainer: {
        flexDirection: 'row', 
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0
    },
    quantityContainer: {
        flexDirection: 'row', 
        flex: 1,
        paddingVertical: 20,
        justifyContent: 'center'
    },
    buttonStyle: {
        flex: 1,
        borderRadius: 0,
        justifyContent: 'center'
    },
    text: {
        fontSize: 12
    },
    priceText: {
        color: 'green',
        fontSize: 11,
        flex: 1,
        alignSelf: 'center',
        alignItems: 'flex-end',
        textAlign: 'right'
    },
    formuleBody: {
        flex: 1, 
        flexDirection: 'row'
    },
    suppText: {
        color: 'red',
        fontSize: 11,
        flex: 1,
        alignSelf: 'center',
        alignItems: 'flex-end',
        textAlign: 'right'
    },
});