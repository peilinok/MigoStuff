import * as React from 'react';
import { View, Text,Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as StoreModel from '../model/store';



const StoreScreen = ()=> {
  const [content,setContent] = React.useState('仓库1');

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{content}</Text>
      <Button
        title="Go to Details"
        onPress={() => {
            StoreModel.createStore('仓库2','大街222号')
            .then(value=>{
              setContent(value.name);
                StoreModel.queryAllStore()
                .then(value=>{
                    console.info(value.length);                    
                })
                .catch(error=>{})
            })
            .catch(error=>{})
            
        }}
      />
    </SafeAreaView>
  );
}

export default StoreScreen;