import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import {createDrawerNavigator,DrawerNavigationProp,DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import {View, SafeAreaView, StyleSheet,Dimensions} from 'react-native'
import BottomTab from "../components/bottomTab";
import {
  StackNavigator,
  DrawerNavigator,
  DrawerItems
} from 'react-navigation';
function Top(props){

    const stacknav = ((screen)=>{
	  props.navigation.navigate(screen)
  });
      return (
          <SafeAreaView style={{flex:1}}>
            <WebView
                source={{uri: 'https://scop.cloud/'}}
                style={{zIndex:2,elevation:2}}
            />
              <BottomTab navdo={stacknav} style={styles.bottomTab}></BottomTab>
              </SafeAreaView>
    );

}
const styles = StyleSheet.create({


bottomTab: {

     },



})

export default Top;
