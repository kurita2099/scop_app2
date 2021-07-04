import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import {createDrawerNavigator,DrawerNavigationProp,DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Top from "./src/screens/top.js";
import mypage from "./src/screens/mypage.js";
const Stack = createStackNavigator();

export default class App extends Component {
  render() {

    return (
             <NavigationContainer>
      <Stack.Navigator>
               <Stack.Screen name="TOP" component={Top} />
               <Stack.Screen name="manage" component={mypage} />
      </Stack.Navigator>
    </NavigationContainer>

    );
  }
}
