import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './src/view/Home';
import StuffScreen from './src/view/Stuff';
import ShopScreen from './src/view/Shop';
import StoreScreen from './src/view/Store';


const Tab = createBottomTabNavigator();
function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'StuffScreen') {
            iconName = focused ? 'fast-food' : 'fast-food-outline';
          }
          else if(route.name === 'ShopScreen') {
            iconName = focused ? 'wine' : 'wine-outline';
          }
          else if(route.name === 'StoreScreen') {
            iconName = focused ? 'albums' : 'albums-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: '主页' }}/>
        <Tab.Screen name="StuffScreen" component={StuffScreen}  options={{ tabBarLabel: '物料' }}/>
        <Tab.Screen name="ShopScreen" component={ShopScreen}  options={{ tabBarLabel: '店铺' }}/>
        <Tab.Screen name="StoreScreen" component={StoreScreen}  options={{ tabBarLabel: '仓库' }}/>
      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;