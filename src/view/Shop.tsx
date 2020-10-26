import * as React from 'react';
import { View, Text } from 'react-native';

function ShopScree1n() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>店铺</Text>
    </View>
  );
}

class ShopScreen extends React.Component{
  componentDidMount(){

  }

  render(){
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>店铺</Text>
    </View>
    );
  }
}

export default ShopScreen;