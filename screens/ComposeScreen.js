import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ListItem, CheckBox, Text, Body, Button } from 'native-base';
import { cloneDeep } from 'lodash';
import Counter from '../components/Counter';
import Salade from '../constants/Salade';
import { StateContext } from '../store';

export default class ComposeScreen extends React.Component {
    static navigationOptions = {
        title: 'Composez votre salade',
    };

    constructor(props, context) {
      super(props, context);

      this.state = {
          type: {},
          bases: [],
          ingredients: [],
          toppings: [],
          sauces: [],
          quantity: 1
      }
    }

    _handlePress = (type) => this.setState({ type });

    _handlePressBase = (base) => {
        const index = this.state.bases.indexOf(base);
        const bases = cloneDeep(this.state.bases);

        if(index > -1 ) {
            bases.splice(index, 1);
            this.setState({ bases })
        } else {
            bases.push(base);
            this.setState({ bases });
        }
    }

    _handlePressIngr = (ingredient, ingrCount) => {
        const index = this.state.ingredients.findIndex(o => o.id === ingredient.id);
        const ingredients = cloneDeep(this.state.ingredients);

        if(index > -1 ) {
            ingredients.splice(index, 1);
            this.setState({ ingredients })
        } else if(ingrCount < this.state.type.maxIngr) {
            ingredients.push({ id: ingredient.id, quantity: 1 });
            this.setState({ ingredients });
        } else if(ingrCount >= this.state.type.maxIngr) {
            Alert.alert(
                this.state.type.label,
                `Vous ne pouvez pas sélectionner plus de ${this.state.type.maxIngr} ingrédients`,
                [
                  {text: 'OK', onPress: () => {}},
                ],
                {cancelable: false},
              );
        }
    }

    _handlePressTopping = (topping, toppingCount) => {
        const index = this.state.toppings.findIndex(o => o.id === topping.id);
        const toppings = cloneDeep(this.state.toppings);

        if(index > -1 ) {
            toppings.splice(index, 1);
            this.setState({ toppings })
        } else if(toppingCount < this.state.type.maxToppings){
            toppings.push({ id: topping.id, quantity: 1 });
            this.setState({ toppings });
        } else if(toppingCount >= this.state.type.maxToppings) {
            Alert.alert(
                this.state.type.label,
                `Vous ne pouvez pas sélectionner plus de ${this.state.type.maxToppings} toppings`,
                [
                  {text: 'OK', onPress: () => {}},
                ],
                {cancelable: false},
              );
        }
    }

    formuleIsValid = () => {
        return !!this.state.type.id;
    }

    baseIsValid = () => {
        return this.formuleIsValid() 
        && this.state.bases.length > 0;
    }

    ingredientIsValid = () => {
        return this.formuleIsValid() 
        && this.baseIsValid()
        && this.state.ingredients.length > 0
        && this.countSelectedIngr() === this.state.type.maxIngr;
    }

    composeIsValid = () => {
        return this.formuleIsValid() 
        && this.baseIsValid()
        && this.ingredientIsValid()
        && this.state.toppings.length > 0
        && this.countSelectedToppings() === this.state.type.maxToppings;
    }

    _handlePressSauce = (sauce) => {
        const index = this.state.bases.indexOf(sauce);
        const sauces = cloneDeep(this.state.sauces);

        if(index > -1 ) {
            sauces.splice(index, 1);
            this.setState({ sauces })
        } else {
            sauces.push(sauce);
            this.setState({ sauces });
        }
    }

    countSelectedIngr() {
        const reducer = (accumulator, currentValue) => accumulator + currentValue.quantity;
        return this.state.ingredients.reduce(reducer, 0);
    }

    countSelectedToppings() {
        const reducer = (accumulator, currentValue) => accumulator + currentValue.quantity;
        return this.state.toppings.reduce(reducer, 0);
    }

    onChangeIngr = (quantity, ingredient, ingrCount) => {
        const index = this.state.ingredients.findIndex(o => o.id === ingredient.id);
        const ingredients = cloneDeep(this.state.ingredients);

        if(index > -1 
            && (ingrCount < this.state.type.maxIngr 
                || (ingrCount === this.state.type.maxIngr && ingredients[index].quantity > quantity)
                )
        ) {
            ingredients[index].quantity = quantity;
            this.setState({ ingredients });
        } else if(ingrCount >= this.state.type.maxIngr) {
            Alert.alert(
                this.state.type.label,
                `Vous ne pouvez pas sélectionner plus de ${this.state.type.maxIngr} ingrédients`,
                [
                  {text: 'OK', onPress: () => {}},
                ],
                {cancelable: false},
              );
        }
    }

    onChangeToppings = (quantity, topping, toppingsCount) => {
        const index = this.state.toppings.findIndex(o => o.id === topping.id);
        const toppings = cloneDeep(this.state.toppings);

        if(index > -1 
            && (toppingsCount < this.state.type.maxToppings 
                || (toppingsCount === this.state.type.maxToppings && toppings[index].quantity > quantity)
                )
        ) {
            toppings[index].quantity = quantity;
            this.setState({ toppings });
        } else if(toppingsCount >= this.state.type.maxToppings) {
            Alert.alert(
                this.state.type.label,
                `Vous ne pouvez pas sélectionner plus de ${this.state.type.maxToppings} ingrédients`,
                [
                  {text: 'OK', onPress: () => {}},
                ],
                {cancelable: false},
              );
        }
    }

    onChangeQuantity = (number) => {
        this.setState({ quantity: number});
    }

    render() {
        const ingrCount= this.countSelectedIngr();
        const toppingsCount= this.countSelectedToppings();
        
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <ScrollView>
                        <ListItem itemDivider>
                            <Text>Formule</Text>
                        </ListItem>
                        {
                            Salade.formula.map(formule => (
                                <ListItem 
                                key={formule.id}
                                onPress={() => this._handlePress(formule)}
                                >
                                    <CheckBox 
                                        checked={this.state.type.id === formule.id} 
                                        onPress={() => this._handlePress(formule)}
                                        />
                                    <Body style={styles.formuleBody}>
                                        <Text>{formule.label}</Text>
                                        <Text style={styles.priceText}>{formule.price} Dhs</Text>
                                    </Body>
                                </ListItem>
                            ))
                        }
                        {
                            this.formuleIsValid() &&
                            <ListItem itemDivider>
                                <Text>Base</Text>
                            </ListItem>
                        }
                        {
                            this.formuleIsValid() &&
                            Salade.bases.map(base => (
                                <ListItem 
                                key={base.id} 
                                onPress={() => this._handlePressBase(base.id)}
                                >
                                    <CheckBox 
                                        checked={this.state.bases.includes(base.id)} 
                                        onPress={() => this._handlePressBase(base.id)}
                                        />
                                    <Body style={base.supp && styles.formuleBody}>
                                        <Text>{base.label}</Text>
                                        {base.supp && <Text style={styles.suppText}>+6 Dh</Text>}
                                    </Body>
                                </ListItem>
                            ))
                        }
                        {
                            this.baseIsValid() &&
                            <ListItem itemDivider>
                                <Text>Ingrédients ({ingrCount}/{this.state.type.maxIngr})</Text>
                            </ListItem>
                        }
                        {
                            this.baseIsValid() &&
                            Salade.ingredients.map(ingredient => (
                                <ListItem key={ingredient.id}>
                                    <CheckBox 
                                        checked={this.state.ingredients.findIndex(o => o.id === ingredient.id) > -1} 
                                        onPress={() => this._handlePressIngr(ingredient, ingrCount)}
                                        />
                                    <Body>
                                        <TouchableOpacity onPress={() => this._handlePressIngr(ingredient, ingrCount)}>
                                            <Text>{ingredient.label}</Text>
                                        </TouchableOpacity>
                                    </Body>
                                    {
                                        this.state.ingredients.findIndex(o => o.id === ingredient.id) > -1 ?
                                        <Counter 
                                        start={1}
                                        min={1}
                                        disabled={this.state.type.maxIngr === ingrCount}
                                        onChange={(number) => this.onChangeIngr(number, ingredient, ingrCount)} 
                                        />: null
                                    }
                                </ListItem>
                            ))
                        }
                        {
                            this.ingredientIsValid() &&
                            <ListItem itemDivider>
                                <Text>Toppings ({toppingsCount}/{this.state.type.maxToppings})</Text>
                            </ListItem>
                        }
                        {
                            this.ingredientIsValid() &&
                            Salade.toppings.map(topping => (
                                <ListItem key={topping.id}>
                                    <CheckBox 
                                        checked={this.state.toppings.findIndex(o => o.id === topping.id) > -1} 
                                        onPress={() => this._handlePressTopping(topping, toppingsCount)}
                                        />
                                    <Body>
                                        <TouchableOpacity onPress={() => this._handlePressTopping(topping, toppingsCount)}>
                                            <Text>{topping.label}</Text>
                                        </TouchableOpacity>
                                    </Body>
                                    {
                                        this.state.toppings.findIndex(o => o.id === topping.id) > -1 ?
                                        <Counter 
                                        start={1}
                                        min={1}
                                        disabled={this.state.type.maxToppings === toppingsCount}
                                        onChange={(number) => this.onChangeToppings(number, topping, toppingsCount)} 
                                        />
                                        : null
                                    }
                                </ListItem>
                            ))
                        }
                        {
                            this.ingredientIsValid() &&
                            <ListItem itemDivider>
                                <Text>Sauce</Text>
                            </ListItem>
                        }
                        {
                            this.ingredientIsValid() &&
                            Salade.sauces.map(sauce => (
                                <ListItem key={sauce.id}>
                                    <CheckBox 
                                        checked={this.state.sauces.includes(sauce.id)} 
                                        onPress={() => this._handlePressSauce(sauce.id)}
                                        />
                                    <Body>
                                        <TouchableOpacity onPress={() => this._handlePressSauce(sauce.id)}>
                                            <Text>{sauce.label}</Text>
                                        </TouchableOpacity>
                                    </Body>
                                </ListItem>
                            ))
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
                        {
                           value => (<Button 
                                    style={styles.buttonStyle}
                                    success={this.composeIsValid()} 
                                    disabled={!this.composeIsValid()} 
                                    onPress={() => {
                                            if(this.composeIsValid()) {
                                                this.props.navigation.navigate('Home', { cart: true })}
                                                value.dispatch({
                                                    type: 'ADD_TO_CART',
                                                    cartItem: { 
                                                        type: this.state.type,
                                                        bases: this.state.bases,
                                                        ingredients: this.state.ingredients,
                                                        toppings: this.state.toppings,
                                                        sauces: this.state.sauces,
                                                        quantity: this.state.quantity
                                                    }
                                                })
                                            }
                                    }
                                >
                                    <Text style={styles.text}>Ajouter au panier</Text>
                                </Button>
                           )
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