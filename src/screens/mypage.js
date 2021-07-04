import {createDrawerNavigator,DrawerNavigationProp,DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import React, { Component } from 'react'
import {View, SafeAreaView, StyleSheet,Dimensions} from 'react-native'
import { WebView } from 'react-native-webview';
import BottomTab from "../components/bottomTab";
import {
  StackNavigator,
  DrawerNavigator,
  DrawerItems
} from 'react-navigation';
function mypage() {

      return (
          <SafeAreaView style={{flex:1}}>
            <WebView
                source={{uri: 'https:https:scop.cloud/wp-admin/'}}
                style={{zIndex:2,elevation:2}}
            />
              <BottomTab style={styles.bottomTab}></BottomTab>
              </SafeAreaView>
    );
  }
const styles = StyleSheet.create({


bottomTab: {

     },



})

export default mypage;
