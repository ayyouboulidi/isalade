import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, Card, Thumbnail, CardItem } from 'native-base';

const thumbnails = {
    salade: require('../assets/images/service/salade.png'),
    crepes: require('../assets/images/service/crepes.png'),
    pizza: require('../assets/images/service/pizza.png'),
    plats: require('../assets/images/service/plats.png'),
}

export default class CardComponent extends React.Component {
  render() {
    return (
        <TouchableOpacity 
            onPress={this.props.navigateTo} 
            style={{ width: '40%', marginHorizontal: '5%', marginVertical: '2%', height: 150 }}
        >
            <Card>
                <CardItem cardBody>
                    <Thumbnail 
                        source={thumbnails[this.props.id] || require('../assets/images/robot-prod.png')} 
                        style={{ flex: 1, justifyContent: 'center', borderRadius: 0, height: 100 }}
                    />
                </CardItem>
                <CardItem cardBody>
                    <Text style={{ flex: 1, textAlign: 'center', marginVertical: 10, fontWeight: "500" }}>
                        {this.props.categoryName}
                    </Text>
                </CardItem>
            </Card>
        </TouchableOpacity>
    );
  }
}


