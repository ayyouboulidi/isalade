import { createStackNavigator } from 'react-navigation';

import ConnectScreen from '../screens/ConnectScreen';

const ConnectStack = createStackNavigator({
  Connect: ConnectScreen,
});

ConnectStack.navigationOptions = {
  header: null
};

export default ConnectStack;
