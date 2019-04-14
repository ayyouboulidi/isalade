import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { ListItem, CheckBox, Text, Body, Button } from 'native-base';
import { Constants, Location, Permissions } from 'expo';


export default class OrderTypeScreen extends React.Component {
    static navigationOptions = {
        title: 'Type',
    };

    constructor(props) {
      super(props);

      this.state = {
          type: null,
          location: null,
          errorMessage: null,
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

    render() {
        let text = 'Waiting..';

        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.location) {
            text = `latitude: ${this.state.location.coords.latitude}, longitude: ${this.state.location.coords.longitude}`;
        }

        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <ListItem>
                    <CheckBox checked={this.state.type === 'deliver'} onPress={() => this._handlePress('deliver')}/>
                    <Body>
                        <Text>Livraison</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <CheckBox checked={this.state.type === 'table'} onPress={() => this._handlePress('table')}/>
                    <Body>
                        <Text>A table</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <CheckBox checked={this.state.type === 'takeAway'} onPress={() => this._handlePress('takeAway')}/>
                    <Body>
                        <Text>A emporter</Text>
                    </Body>
                </ListItem>
                {
                    this.state.type === 'deliver' &&
                    <Text>{text}</Text>
                }
                <View style={{ flex: 1 }}>
                    <View style={styles.buttonContainer}>
                        <Button 
                            style={styles.buttonStyle}
                            success={!!this.state.type} 
                            disabled={!!!this.state.type} 
                            onPress={() => !!this.state.type && this.props.navigation.navigate('Compose')}
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
});