import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { ListItem, CheckBox, Text, Body, Button, Spinner } from 'native-base';
import { Constants, Location, Permissions } from 'expo';
import uuid from 'uuid';
import { getAllTypesCommand } from '../services';


export default class OrderTypeScreen extends React.Component {
    static navigationOptions = {
        title: 'Type de votre commande',
    };

    constructor(props) {
      super(props);

      this.state = {
          type: null,
          location: null,
          errorMessage: null,
          orderTypes : [],
          loading: true
      }
    }

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
          this.setState({
            errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
          });
        } else {
          this._getLocationAsync();
        }
    }

    componentDidMount() {
        getAllTypesCommand()
            .then(res => res.json())
            .then(orderTypes => {
                this.setState({ orderTypes, loading: false });
            })
            .catch(e => console.error(e));
    }    
    
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
    
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
    };

    _handlePress = (type) => this.setState({ type });

    _handleNextPress = (type, productId, productName) => {
        if(!!type) {
            switch(productId) {
                case 1:
                    this.props.navigation.navigate('Compose', { productName, productId });
                    break;
                default:
                    this.props.navigation.navigate('Static', { productName, productId });
                    break;
            }
        }
    }

    render() {
        let text = 'Waiting..';
        const { productName, productId } = this.props.navigation.state.params;
        const { type, orderTypes, errorMessage, location, loading } = this.state;

        if (errorMessage) {
            text = errorMessage;
        } else if (location) {
            text = `latitude: ${location.coords.latitude}, longitude: ${location.coords.longitude}`;
        }


        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                {
                    loading ?
                    <Spinner />
                    : orderTypes.map(orderType => (
                        <ListItem key={uuid()} onPress={() => this._handlePress(orderType.id)}>
                            <CheckBox 
                                checked={type === orderType.id} 
                                onPress={() => this._handlePress(orderType.id)}
                            />
                            <Body>
                                <Text style={styles.label}>{orderType.name.capitalize()}</Text>
                            </Body>
                        </ListItem>
                    ))
                } 
                { type === 1 && <Text>{text}</Text> }
                <View style={{ flex: 1 }}>
                    <View style={styles.buttonContainer}>
                        <Button 
                            style={styles.buttonStyle}
                            success={!!type} 
                            disabled={!!!type} 
                            onPress={() => this._handleNextPress(type, productId, productName)}
                        >
                            <Text>Suivant</Text>
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
    label: {
        textTransform: 'capitalize',
    },
});