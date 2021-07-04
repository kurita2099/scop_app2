import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import {createDrawerNavigator,DrawerNavigationProp,DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import {
  StackNavigator,
  DrawerNavigator,
  DrawerItems
} from 'react-navigation';
export default class App extends Component {
  render() {

    return (
      <WebView
        source={{uri: 'https://scop.cloud/'}}
        style={{marginTop: 0}}
      />
    );
  }
}



