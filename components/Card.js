import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, Card, Thumbnail, CardItem } from 'native-base';

const images = {
    products_types: {
      'default': require('../assets/images/robot-prod.png'),
      'assets/images/products_types/1.jpg': require('../assets/images/products_types/1.jpg'),
      'assets/images/products_types/2.jpg': require('../assets/images/products_types/2.jpg'),
      'assets/images/products_types/3.jpg': require('../assets/images/products_types/3.jpg'),
      'assets/images/products_types/4.jpg': require('../assets/images/products_types/4.jpg'),
      'assets/images/products_types/5.jpg': require('../assets/images/products_types/5.jpg'),
      'assets/images/products_types/6.jpg': require('../assets/images/products_types/6.jpg'),
      'assets/images/products_types/7.jpg': require('../assets/images/products_types/7.jpg'),
      'assets/images/products_types/8.jpg': require('../assets/images/products_types/8.jpg'),
      'assets/images/products_types/9.jpg': require('../assets/images/products_types/9.jpg'),
      'assets/images/products_types/10.jpg': require('../assets/images/products_types/10.jpg'),
      'assets/images/products_types/11.jpg': require('../assets/images/products_types/11.jpg'),
      'assets/images/products_types/12.jpg': require('../assets/images/products_types/12.jpg'),
      'assets/images/products_types/13.jpg': require('../assets/images/products_types/13.jpg'),
      'assets/images/products_types/14.jpg': require('../assets/images/products_types/14.jpg'),
      'assets/images/products_types/15.jpg': require('../assets/images/products_types/15.jpg'),
      'assets/images/products_types/16.jpg': require('../assets/images/products_types/16.jpg'),
      'assets/images/products_types/17.jpg': require('../assets/images/products_types/17.jpg'),
      'assets/images/products_types/18.jpg': require('../assets/images/products_types/18.jpg'),
      'assets/images/products_types/19.jpg': require('../assets/images/products_types/19.jpg'),
    }
};

export default class CardComponent extends React.Component {
  render() {
    const { productName, theme, productImage = 'default' } = this.props;

    return (
        <TouchableOpacity 
            onPress={this.props.navigateTo} 
            style={{ width: '40%', marginHorizontal: '5%', marginVertical: '2%', height: 150 }}
        >
            <Card>
                <CardItem cardBody>
                    <Thumbnail 
                        source={images[theme][productImage]}
                        style={{ flex: 1, justifyContent: 'center', borderRadius: 0, height: 100 }}
                    />
                </CardItem>
                <CardItem cardBody>
                    <Text capitalize style={{ flex: 1, textAlign: 'center', marginVertical: 10, fontWeight: "500" }}>
                        {productName.capitalize()}
                    </Text>
                </CardItem>
            </Card>
        </TouchableOpacity>
    );
  }
}


