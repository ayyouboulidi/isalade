import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ListItem, CheckBox, Text, Body, Button } from 'native-base';
import { cloneDeep } from 'lodash';
import Counter from 'react-native-counters';
import Salade from '../constants/Salade';

export default class FormuleScreen extends React.Component {
    static navigationOptions = {
        title: 'Composez votre salade',
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

    onChange = (quantity, id, target) => {
        console.log('....', quantity, id, target)
    }

    render() {
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
                                onPress={() => this._handlePress(formule.id)}
                            >
                                <CheckBox 
                                    checked={this.state.type === formule.id} 
                                    onPress={() => this._handlePress(formule.id)}
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
                                    checked={this.state.base.includes(base.id)} 
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
                            <Text>Ingrédients</Text>
                        </ListItem>
                    }
                    {
                        this.baseIsValid() &&
                        Salade.ingredients.map(ingredient => (
                            <ListItem 
                                key={ingredient.id}
                                onPress={() => this._handlePressIngr(ingredient.id)}
                            >
                                <CheckBox 
                                    checked={this.state.ingredients.includes(ingredient.id)} 
                                    onPress={() => this._handlePressIngr(ingredient.id)}
                                />
                                <Body>
                                    <Text>{ingredient.label}</Text>
                                </Body>
                                {
                                    this.state.ingredients.includes(ingredient.id) ?
                                    <Counter 
                                        start={1} 
                                        onChange={(number) => this.onChange(number, ingredient.id, 'ingredient')} 
                                    />: null
                                }
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
                        Salade.toppings.map(topping => (
                            <ListItem 
                                key={topping.id}
                                onPress={() => this._handlePressTopping(topping.id)}
                            >
                                <CheckBox 
                                    checked={this.state.toppings.includes(topping.id)} 
                                    onPress={() => this._handlePressTopping(topping.id)}
                                />
                                <Body>
                                    <Text>{topping.label}</Text>
                                </Body>
                                {
                                    this.state.toppings.includes(topping.id) ?
                                    <Counter 
                                        start={1} 
                                        onChange={(number) => this.onChange(number, topping.id, 'topping')} 
                                    />
                                    : null
                                }
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