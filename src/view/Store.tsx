import * as React from 'react';
import { View,StyleSheet,FlatList, Text,Button,RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as StoreModel from '../model/store';
import ToastShow from '../utils/toast';


const StoreItem = (props:{item:StoreModel.StoreType})=>{
  return (
  <View>
    <Text>{props.item.name}</Text>
  </View>
  );
}

const StoreScreen = ()=> {
  const [content,setContent] = React.useState('仓库1');
  const [storeList,setStoreList] = React.useState<StoreModel.StoreType[]>([] as StoreModel.StoreType[]);
  const [refreshing,setRefreshing] = React.useState(false);
  const renderItem = ({item}:{item:StoreModel.StoreType}) =>(
    <StoreItem item={item}/>
  );

  const onRefresh= React.useCallback(()=>{
    setRefreshing(true);

    StoreModel.queryAllStore()
    .then(value=>{
      setStoreList(value);
      setRefreshing(false);
      console.info(value.length);                    
    })
    .catch(error=>{
      console.error(error);
    })
  },[]);

  
  return (
    <SafeAreaView style={styles.container}>
      <Text>{content}</Text>
      <Button
        title="Go to Details"
        onPress={() => {
            StoreModel.createStore('仓库2','大街222号')
            .then(value=>{
              setContent(value.name);
              ToastShow(value.name);
            })
            .catch(error=>{
              console.error(error);
            })
        }}
      />

      <FlatList
      data={storeList}
      renderItem={renderItem}
      keyExtractor={item=>item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }
      >

      </FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
});

export default StoreScreen;