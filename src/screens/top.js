import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import {createDrawerNavigator,DrawerNavigationProp,DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import {View, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  Modal, 
  Alert, 
  TouchableHighlight,
  Dimensions } from 'react-native'
import BottomTab from "../components/BottomTab";
import {
  StackNavigator,
  DrawerNavigator,
  DrawerItems
} from 'react-navigation';
function Top(props){
    const [modalVisible, setModalVisible] = React.useState(false);
    const [url, setUrl] = React.useState("https://scop.cloud/");
    const stacknav = ((screen)=>{
	  //props.navigation.navigate(screen)
    console.log(screen);
    switch(screen){
      case "Top":
        setUrl("https://scop.cloud/");
        break;
      case "ManageScreen":
        setUrl("https://scop.cloud/wp-admin/");
        break;
      case "NewPost":
        setUrl("https://scop.cloud/wp-admin/edit.php");
        break;
      

    }
    
  });
  const opensearch = (param)=>{
    console.log(param);
    setModalVisible(true);
  };
      return (
          <SafeAreaView style={{flex:1}}>
            <WebView
                source={{uri: url}}
                style={styles.webview}
            />
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');

        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
              <BottomTab opensearch={opensearch} navdo={stacknav} style={styles.bottomTab}></BottomTab>
              </SafeAreaView>
    );

}
const styles = StyleSheet.create({


bottomTab: {
  width: Dimensions.get('window').width
     },
webview:{
  height: Dimensions.get('window').height-105,
  width: Dimensions.get('window').width,
  zIndex:2,elevation:2
},
centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 22,
},
modalView: {
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 35,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
openButton: {
  backgroundColor: '#F194FF',
  borderRadius: 20,
  padding: 10,
  elevation: 2,
},
textStyle: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
modalText: {
  marginBottom: 15,
  textAlign: 'center',
}


})

export default Top;
