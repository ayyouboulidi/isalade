import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, Card, Thumbnail, CardItem } from 'native-base';

export default class CardComponent extends React.Component {
  render() {
    return (
        <TouchableOpacity onPress={this.props.navigateTo} style={{ width: '40%', margin: '5%'}}>
            <Card>
                <CardItem>
                    <Thumbnail source={require('../assets/images/robot-prod.png')} style={{flex: 1, justifyContent: 'center'}}/>
                </CardItem>
                <CardItem cardBody>
                    <Text style={{flex: 1, textAlign: 'center'}}>{this.props.categoryName}</Text>
                </CardItem>
            </Card>
        </TouchableOpacity>
    );
  }
}


