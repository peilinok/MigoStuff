import * as React from 'react';
import {View, StyleSheet, Text, Button, Dimensions} from 'react-native';

import * as StoreModel from '../model/store';

declare type StoreItemProps = {
  item: StoreModel.StoreType;
};

declare type StoreItemState = {};

class StoreItem extends React.Component<StoreItemProps, StoreItemState> {
  constructor(props: StoreItemProps) {
    super(props);
  }

  render() {
    const {item} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.infoName}>{item.name}</Text>
          <Text style={styles.infoAddress}>{item.address}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 80,
    width: Dimensions.get('window').width,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  info: {
    height: 60,
    backgroundColor: 'lightgray',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  infoName: {
    fontSize: 20,
  },
  infoAddress: {
    fontSize: 14,
  },
});

export default StoreItem;
