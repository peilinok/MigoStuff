import * as React from 'react';
import { View, StyleSheet, FlatList, Text, Button, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as StoreModel from '../model/store';
import ToastShow from '../utils/toast';


const StoreItem = (props: { item: StoreModel.StoreType }) => {
  return (
    <View>
      <Text>{props.item.name}</Text>
    </View>
  );
}

declare type StoreScreenProps = {

}

declare type StoreScreenState = {
  content: string;
  storeList: StoreModel.StoreType[];
  refreshing: boolean;
}

class StoreScreen extends React.Component<StoreScreenProps, StoreScreenState> {
  constructor(props: StoreScreenProps) {
    super(props);
    this.state = {
      content: '仓库1',
      storeList: [],
      refreshing: false
    };

    this.renderItem = this.renderItem.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    this.onRefresh();
  }

  renderItem({ item }: { item: StoreModel.StoreType }) {
    return (
      <StoreItem item={item} />
    );
  };

  onRefresh() {
    this.setState({ refreshing: true });

    StoreModel.queryAllStore()
      .then(value => {
        this.setState({ refreshing: false, storeList: value });
        console.info(value.length);
      })
      .catch(error => {
        console.error(error);
      })
  };

  render() {
    const { content, storeList, refreshing } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Text>{content}</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            StoreModel.createStore('仓库2', '大街222号')
              .then(value => {
                this.setState({ content: value.name });
                ToastShow(value.id);
              })
              .catch(error => {
                console.error(error);
              })
          }}
        />

        <FlatList
          data={storeList}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
          }
        >

        </FlatList>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default StoreScreen;