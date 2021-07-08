import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import {createDrawerNavigator,DrawerNavigationProp,DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import KeywordForm from "../components/KeywordForm";
import AndButton from "../components/AndButton";
import OrButton from "../components/OrButton";
import DropDownPicker from 'react-native-dropdown-picker';
//import {Button, Card} from 'react-native-paper';

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
    const [collapsed, setCollapsed] = React.useState(false);
    const [isand, setIsand] = React.useState(true);
    const [category, setCategory] = React.useState({});
    const [categories, setCategories] = React.useState([]);
    const [keyword, setKeyword] = React.useState("");
    React.useEffect(() => {
      console.log("step start")
      //サーバーから取得
      getData();
    }, []);
    const getData = async () => {
    //APIからJSONデータを取得する
    fetch('https://scop.cloud/wp-json/wp/v2/categories',{
      
        crossDomain:true,
        method: 'GET',
    })
      .then((response) => {
        return response.json()　//ここでBodyからJSONを返す
      })
      .then((result) => {
        //取得したJSONデータを関数に渡す 
        //console.log(result)
        
        setCategories(result.map(function( value ) {
 
          //配列の各要素を2倍にする
          return {'label':value.name,'value':value.id};
       
      }));
    })
    .catch((e) => {
      console.log(e)  //エラーをキャッチし表示     
    })
    }
    const searchUrl = ()　=>　{　
      var query = '';
      
      query += '?search_keywords=' + keyword;
      query += '&search_keywords_operator=' + (isand ? 'and' : 'or');
      
      query += '&search_cat1=' + (category.value ? category.value : 0);
      console.log(query)
      setUrl("https://scop.cloud/"+query);
    }
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
  
  const onPressItem= ((key)=>{
        console.log(key);
        setCollapsed(false)
        setCategory(key)
      });
  const onPressAndOrButton= ((key)=>{
        console.log(key);
        setIsand(key === 'and');
      });   
  const toggleMenu= (val)=> {setCollapsed(!val)};  
  const receiveKeyword= (val)=> {setKeyword(val)}; 

  const [myArray, setMyArray]= React.useState([]);
  const [open, setOpen]= React.useState(false);
  const [value, setValue]= React.useState(null);
  
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: url }}
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
          <View style={styles.keywordFormStack}>
          <KeywordForm style={styles.keywordForm} sendKeyword={receiveKeyword}></KeywordForm>
          <AndButton style={isand ? styles.materialButtonVioletActive : styles.materialButtonViolet}
          onpress={onPressAndOrButton}
          />
          <OrButton style={!isand ? styles.materialButtonPinkActive : styles.materialButtonPink}
          onpress={onPressAndOrButton}
          />
          </View>
          <View style={styles.dropdownView}>
          <DropDownPicker
              items={categories}
              labelStyle = {{
                  fontSize: 18,
                  textAlign: 'center',
              }}
              
              containerStyle={{position: 'relative',height:'20%',width: '100%', left: '0%', paddingTop: 10}}
            
              style={{backgroundColor: 'hsla(0, 0%, 0%, 0.05)'}}
              dropDownStyle={{backgroundColor: 'hsla(0, 0%, 0%, 0.05)'}}
              onChangeItem={item => {
                console.log(JSON.stringify(item))
                setCategory(item);
              }}
              placeholder = "選択してください" 
              placeholderStyle = {{
                  fontWeight: 'bold',
                  textAlign: 'center'
              }}
              activeLabelStyle = {{color: 'red'}}
            />
          </View>
           
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => {
                setModalVisible(!modalVisible);
                searchUrl();
              }}>
              <Text style={styles.textStyle}>検索</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
     
      <BottomTab opensearch={opensearch} navdo={stacknav} style={styles.bottomTab}></BottomTab>
    </SafeAreaView>
  );

}
const styles = StyleSheet.create({
dropdownView:{
  position: "absolute",
  left: 40,
  top: 120,
  width: Dimensions.get('window').width*0.7,
  borderColor: "rgba(29,129,230,1)",
  borderRadius: 8,
  borderWidth: 1,
  elevation: 3000,
  zIndex:3000,
},

bottomTab: {
  width: Dimensions.get('window').width
     },
webview:{
  height: (Dimensions.get('window').height - 605),
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
  marginTop: 150,
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
},
materialButtonViolet: {
  height: 23,
  width: 91,
  position: "absolute",
  left: 210,
  top: 10,
  borderWidth: 1,
  borderColor: "rgba(155,146,146,1)",
  borderRadius: 5
},
materialButtonPink: {
  height: 24,
  width: 91,
  position: "absolute",
  left: 210,
  top: 34,
  borderWidth: 1,
  borderColor: "rgba(155,146,146,1)",
  borderRadius: 5
},
materialButtonVioletActive: {
  height: 23,
  width: 91,
  position: "absolute",
  left: 210,
  top: 10,
  borderWidth: 1,
  borderColor: "rgba(155,146,146,1)",
  backgroundColor: "rgba(61,78,142,1)",
  borderRadius: 5
},
materialButtonPinkActive: {
  height: 24,
  width: 91,
  position: "absolute",
  left: 210,
  top: 34,
  borderWidth: 1,
  borderColor: "rgba(155,146,146,1)",
  backgroundColor: "rgba(61,78,142,1)",
  borderRadius: 5
},
keywordForm: {
  position: "absolute",
  top: 10,
  left: 0,
  height: 47,
  width: 301
},
keywordFormStack: {
  width: 301,
  height: 48,
  marginTop: 20,
  marginLeft: 1
},


})

export default Top;
