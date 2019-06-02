import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ListItem, CheckBox, Text, Body, Spinner } from 'native-base';
import { getListProducts } from '../services';


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Static Screen',
    };

    constructor(props, context) {
        super(props, context);
  
        this.state = {
            productsList: [],
            product: {},
            quantity: 1,
            loading: true
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
                        : this.state.productsList.map(menu => (
                            <ListItem 
                                key={`product_${menu.id}`}
                                onPress={() => {}}
                            >
                                <CheckBox 
                                    onPress={() => {}}
                                />
                                <Body style={styles.formuleBody}>
                                    <Text>{menu.name.capitalize()}</Text>
                                    <Text style={styles.priceText}>{menu.price} Dhs</Text>
                                </Body>
                            </ListItem>
                        ))
                    }
                </ScrollView>
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
    formuleBody: {
        flex: 1, 
        flexDirection: 'row'
    },
});