import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ListItem, CheckBox, Text, Body, Button } from 'native-base';
import { cloneDeep } from 'lodash';

const formula = [
    { id: 'formule5', label: '5 ingrédients & 1 Toppings', price: 29 },
    { id: 'formule9', label: '9 ingrédients & 2 Toppings', price: 49 },
    { id: 'formule28', label: '28 ingrédients & 4 Toppings', price: 79 },
    { id: 'formule34', label: '34 ingrédients & 5 Toppings', price: 120 }
];

const bases = [
    { id: 'rice', label: 'Riz' },
    { id: 'pasta', label: 'Pâtes' },
    { id: 'ebly', label: 'Ebly' },
    { id: 'quiona', label: 'Quiona', supp: true }
];

const ingr = [
    { id: 'cucumber', label: 'Concombre' },
    { id: 'potato', label: 'Pomme de terre' },
    { id: 'tomato', label: 'Tomates' },
    { id: 'poivron', label: 'Poivrons' },
    { id: 'ingr1', label: 'ingrédient 1' },
    { id: 'ingr2', label: 'ingrédient 2' },
    { id: 'ingr3', label: 'ingrédient 3' },
    { id: 'ingr4', label: 'ingrédient 4' },
    { id: 'ingr5', label: 'ingrédient 5' },
    { id: 'ingr6', label: 'ingrédient 6' },
];

const topp = [
    { id: 'surimi', label: 'Surimi' },
    { id: 'chicken', label: 'Poulet' },
    { id: 'topp1', label: 'Topping 1' },
    { id: 'topp2', label: 'Topping 2' },
    { id: 'topp3', label: 'Topping 3' },
    { id: 'topp4', label: 'Topping 4' },
    { id: 'topp5', label: 'Topping 5' },
    { id: 'topp6', label: 'Topping 6' },
];

export default class FormuleScreen extends React.Component {
    static navigationOptions = {
        title: 'Composez',
    };

    constructor(props) {
      super(props);

      this.state = {
          type: null,
          base: [],
          ingredients: [],
          toppings: [],
      }
    }

    _handlePress = (type) => this.setState({ type });

    _handlePressBase = (base) => {
        const index = this.state.base.indexOf(base);
        const state = cloneDeep(this.state.base);

        if(index > -1 ) {
            state.splice(index, 1);
            this.setState({ base: state })
        } else {
            state.push(base);
            this.setState({ base: state });
        }
    }

    _handlePressIngr = (ingredient) => {
        const index = this.state.ingredients.indexOf(ingredient);
        const state = cloneDeep(this.state.ingredients);

        if(index > -1 ) {
            state.splice(index, 1);
            this.setState({ ingredients: state })
        } else {
            state.push(ingredient);
            this.setState({ ingredients: state });
        }
    }

    _handlePressTopping = (topping) => {
        const index = this.state.toppings.indexOf(topping);
        const state = cloneDeep(this.state.toppings);

        if(index > -1 ) {
            state.splice(index, 1);
            this.setState({ toppings: state })
        } else {
            state.push(topping);
            this.setState({ toppings: state });
        }
    }

    

    formuleIsValid = () => {
        return !!this.state.type;
    }

    
    baseIsValid = () => {
        return this.formuleIsValid() 
        && this.state.base.length > 0;
    }

    ingredientIsValid = () => {
        return this.formuleIsValid() 
        && this.baseIsValid()
        && this.state.ingredients.length > 0;
    }

    composeIsValid = () => {
        return this.formuleIsValid() 
        && this.baseIsValid()
        && this.ingredientIsValid()
        && this.state.toppings.length > 0;
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <ScrollView>
                    <ListItem itemDivider>
                        <Text>Formule</Text>
                    </ListItem>
                    {
                        formula.map(formule => (
                            <ListItem key={formule.id}>
                                <CheckBox checked={this.state.type === formule.id} onPress={() => this._handlePress(formule.id)}/>
                                <Body style={styles.formuleBody}>
                                    <Text style={styles.text}>{formule.label}</Text>
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
                        bases.map(base => (
                            <ListItem key={base.id}>
                                <CheckBox checked={this.state.base.includes(base.id)} onPress={() => this._handlePressBase(base.id)}/>
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
                            <Text>Ingrédients</Text>
                        </ListItem>
                    }
                    {
                        this.baseIsValid() &&
                        ingr.map(ingredient => (
                            <ListItem key={ingredient.id}>
                                <CheckBox 
                                    checked={this.state.ingredients.includes(ingredient.id)} 
                                    onPress={() => this._handlePressIngr(ingredient.id)}
                                />
                                <Body>
                                    <Text>{ingredient.label}</Text>
                                </Body>
                            </ListItem>
                        ))
                    }
                    {
                        this.ingredientIsValid() &&
                        <ListItem itemDivider>
                            <Text>Toppings</Text>
                        </ListItem>
                    }
                    {
                        this.ingredientIsValid() &&
                        topp.map(topping => (
                            <ListItem key={topping.id}>
                                <CheckBox 
                                    checked={this.state.toppings.includes(topping.id)} 
                                    onPress={() => this._handlePressTopping(topping.id)}
                                />
                                <Body>
                                    <Text>{topping.label}</Text>
                                </Body>
                            </ListItem>
                        ))
                    }
                </ScrollView>
                <View style={{ flex: 1, paddingTop: 50 }}>
                    <View style={styles.buttonContainer}>
                        <Button 
                            style={styles.buttonStyle}
                            success={this.composeIsValid()} 
                            disabled={!this.composeIsValid()} 
                            onPress={() => this.composeIsValid() && this.props.navigation.navigate('Home', {
                                cart: { 
                                    type: this.state.type,
                                    base: this.state.base,
                                    ingredients: this.state.ingredients,
                                    toppings: this.state.toppings
                                }
                            })}
                        >
                            <Text style={styles.text}>Ajouter au panier</Text>
                        </Button>
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
    buttonStyle: {
        flex: 1,
        borderRadius: 0,
        justifyContent: 'center'
    },
    text: {
        fontSize: 10
    },
    priceText: {
        fontSize: 10,
        color: 'green'
    },
    formuleBody: {
        flex: 1, 
        flexDirection: 'row'
    },
    suppText: {
        color: 'red'
    },
});