import React from 'react';
import { View, StyleSheet, Text} from 'react-native';


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Static Screen',
    };


    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.navigation.state.params.categoryName}</Text>
                <Text>THIS PAGE IS UNDER CONSTRUCTION, PLEASE WAIT...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 30,
    }
});