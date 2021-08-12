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
  ActivityIndicator,
  TouchableHighlight,
  Dimensions } from 'react-native'
import BottomTab from "../components/BottomTab";
import {
  StackNavigator,
  DrawerNavigator,
  DrawerItems
} from 'react-navigation';
import { IconButton } from 'react-native-paper';
const HOMEURL =  "https://scop.cloud/";
const SEARCHURL = "https://scop.cloud/";//上と内容が一生だけど、こっちはクエリがつく。
const MANAGEURL = "https://scop.cloud/wp-admin/";
const EDITPOSTURL = "https://scop.cloud/wp-admin/edit.php";

function Top(props){
    const [isLoading, setLoading] = React.useState(false);
    const [animating, setAnimating] = React.useState(true);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [url, setUrl] = React.useState("https://scop.cloud/");
    const [collapsed, setCollapsed] = React.useState(false);
    const [isand, setIsand] = React.useState(true);
    const [category, setCategory] = React.useState({});
    const [categories, setCategories] = React.useState([]);
    const [keyword, setKeyword] = React.useState("");
    const ref = React.useRef(null);
    const currentUrl = React.useRef("");
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
      setUrl(SEARCHURL + query);
      setLoading(true);
    }
    const stacknav = ((screen)=>{
	  //props.navigation.navigate(screen)
    console.log(screen);
    switch(screen){
      case "Top":
        if(currentUrl.current !== HOMEURL){
          reloadUrl( HOMEURL );
          setLoading(true);
        }else{
          setUrl(HOMEURL);
         
          scrollTop();
        }
        break;
      case "ManageScreen":
        setUrl(MANAGEURL);
        setLoading(true);
        break;
      case "NewPost":
        setUrl(EDITPOSTURL);
        setLoading(true);
        break;
      

    }
    
  });

  const reloadUrl = (adress)=>{
    if(ref){
    const jscode = `
    window.location.href = "${adress}";
    true;
  `;
    ref.current.injectJavaScript(jscode)
    }
  }
  const scrollTop = ()=>{
    if(ref){
    const jscode = `
    if(getScrolled === undefined){
      var isscroll = false;
      function getScrolled() {
        return window.pageYOffset;
      }
      //トップに移動する関数
    function scrollToTop() {
      var scrolled = getScrolled();
      window.scrollTo( 0, Math.floor( scrolled / 2 ) );
      if ( scrolled > 0 ) {
        isscroll = true;
        window.setTimeout( scrollToTop, 30 );
      }else{
        isscroll = false;
      }
    }
    let _startY;
    window.addEventListener('touchstart', e => {
      _startY = e.touches[0].pageY;
    });
    window.addEventListener('touchmove', e => {
      const y = e.touches[0].pageY;
      //if( y > _startY && Math.abs(y - _startY) > 50){
      //  alert("reflesh")
      //}
    }); 
    }else{
      //alert("reload")
      //alert(getScrolled())
      if(!isscroll){
        scrollToTop();
      }
    }
    true;
  `;
    ref.current.injectJavaScript(jscode)
    }
  }
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
  const [value, setValue]=  React.useState(null);
  
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      <WebView
        source={{ uri: url }}
        style={styles.webview}
        ref={ref}
        injectedJavaScript={`
        // WEBVIEWのURLが変わるたびに呼ばれる　現在のURLを送信する
        //window.location.hrefごとに処理を行えるようにする条件分岐
        window.ReactNativeWebView.postMessage(window.location.href);
      
        if(window.location.href == "${HOMEURL}"){
          //バナーを消してメニューに項目をたす
              document.querySelector('.banner_1').hidden = true;
              document.querySelector("#index_header_search").style.display ="none";
              
              var ulds = document.querySelectorAll("#global_menu ul")
              var uld = ulds[ulds.length-1];
              var ld = document.querySelector("#global_menu li")
              var cl = ld.cloneNode(true);
              cl.setAttribute("id","menu-item-100")
              uld.appendChild(cl)
              cl = ld.cloneNode(true);
              cl.setAttribute("id","menu-item-101")
              uld.appendChild(cl)
              cl = ld.cloneNode(true);
              cl.setAttribute("id","menu-item-102")
              uld.appendChild(cl)
              
              
              var lld = document.querySelectorAll("#global_menu li a")
              var leng = lld.length - 3
              var node = lld[leng++]
              node.innerText="利用規約";
              node.setAttribute("href","https://scop.cloud/terms/")
              node = lld[leng++]
              node.innerText="プライバシーポリシー";
              node.setAttribute("href","privacy-policy/")
              node = lld[leng++]
              node.innerText="運営会社";
              node.setAttribute("href","https://minbar.jp/")
              
              

              }
        if(window.location.href == "${EDITPOSTURL}"){
          var wpw=document.querySelector("#wpwrap")
          var inputs=document.querySelectorAll("input")
          inputs.forEach(function (target) {
              // 引数targetにはdiv要素が1つずつ渡されている
              target.addEventListener('click', ()=>wpw.setAttribute("class",""));
          });
              }
        document.getElementById("footer").hidden=true
        true; // 必須
      `}
      onMessage={(event)=>{
        const {data} = event.nativeEvent
        currentUrl.current = data;
        console.log(data)
        setLoading(false);
      }
      }  
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
            
              style={{backgroundColor: 'hsla(100, 100%, 100%, 1)',color: 'black'}}
              dropDownStyle={{backgroundColor: 'hsla(100, 100%, 100%, 1)',color: 'black'}}
              onChangeItem={item => {
                console.log(JSON.stringify(item))
                setCategory(item);
              }}
              labelStyle = {{
                fontSize: 18,
                color: 'blue',
                textAlign: 'left',
              }}
              placeholder = "カテゴリーから選ぶ" 
              placeholderStyle = {{
                  fontWeight: 'bold',
                  textAlign: 'left',
                  color: 'black'
              }}
              activeLabelStyle = {{color: 'black'}}
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
          <View>            
            <IconButton icon="close" size={40}  style={styles.closeView}
            onPress={() => {
              setModalVisible(!modalVisible);
              
            }}
            /> 
          </View>
        </View>
      </Modal>
      {isLoading &&
        <View style={styles.loading}>
          <ActivityIndicator animating={animating} size="large" color="#0000ff" />
        </View>
      }
      <BottomTab opensearch={opensearch} navdo={stacknav} style={styles.bottomTab}></BottomTab>
    </SafeAreaView>
  );

}
const styles = StyleSheet.create({
dropdownView:{
  position: "absolute",
  left: 35,
  top: 90,
  width: (400-100),
  borderColor: "rgba(29,129,230,1)",
  borderRadius: 8,
  borderWidth: 1,
  elevation: 3000,
  zIndex:3000,
},

bottomTab: {
  zIndex: 6, // works on ios
  elevation: 6, // works on android
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
  marginTop: (Dimensions.get('window').height*0.50)
},
closeView: {
  marginTop: -20,
  top: -230,
  marginLeft: 310,
},
modalView: {
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  paddingTop: 30,
  paddingBottom:20,
  paddingLeft: 35,
  paddingRight: 35,
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
  marginTop: 100,
  width: Dimensions.get('window').width*0.5,
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
  width:(91-40),
  position: "absolute",
  left: 210,
  top: 10,
  borderWidth: 1,
  borderColor: "rgba(155,146,146,1)",
  borderRadius: 5
},
materialButtonPink: {
  height: 24,
  width:(91-40),
  position: "absolute",
  left: 210,
  top: 34,
  borderWidth: 1,
  borderColor: "rgba(155,146,146,1)",
  borderRadius: 5
},
materialButtonVioletActive: {
  height: 23,
  width:(91-40),
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
  width:(91-40),
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
  width: 201
},
keywordFormStack: {
  width: 301,
  height: 48,
  marginTop: -10,
  marginLeft: 1
},

loading: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center'
}
})

export default Top;
