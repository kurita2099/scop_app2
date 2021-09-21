import React, { Component } from 'react';
import {
  Alert } from "react-native";

import { WebView } from 'react-native-webview';
import {createDrawerNavigator,DrawerNavigationProp,DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';  // 追加するコンポーネント
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import { v4 as uuidv4 } from 'uuid';
import Top from "./src/screens/top.js";
import mypage from "./src/screens/mypage.js";
const Stack = createStackNavigator();
// アプリがフォアグラウンドの時に通知を受信した時の振る舞いを設定
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function App() {
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  const getUUid = async ()=> {
    
    let uuid;
    try{
    uuid =  await SecureStore.getItemAsync('secure_deviceid');
  
    if(uuid){
      console.log("uuid="+uuid);
      return uuid;
    }
    uuid = uuidv4();
    //console.log("uuid="+uuid);
    await SecureStore.setItemAsync('secure_deviceid', uuid);
    //let fetchUUID = await SecureStore.getItemAsync('secure_deviceid');
  }catch(e){
    console.log("error=");
    console.log(e.message);
  }
    console.log("uuid="+uuid);
    return uuid;
  }
  const sendToken = async (token) => {
    //https://tokyohistory.sakura.ne.jp/app/php/action.php
    try{
    let uuid = await getUUid();
    //const data = new URLSearchParams();
    const data = new FormData();
    //for (const pair of new FormData(formElement)) {
    data.append("serial", uuid);
    data.append("token", token);
    //consolelog(token)
    //}

    fetch("https://kk-pollyanna.com/scop_/" + 'action.php',{
      cache: "no-cache",
      crossDomain:true,
      method: 'POST',
      body: data
    })
    .then((response) => {
     //console.log(response)
     return response.text()
    }).then((response) => {
      console.log(response);
    });
  }catch(e){
    console,log(e.message)
  }
  }
  const registerForPushNotificationsAsync = async () => {
    // 実機端末か否かを判定
    if (Constants.isDevice) {
      
      //const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      const { existingStatus } = await Notifications.getPermissionsAsync();
   
      let finalStatus = existingStatus;
      console.log("permission="+existingStatus);
      // ユーザーによる通知の許可or許可しないが決定していないときのみ
      if (existingStatus !== 'granted') {
        //const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        const { status } = await Notifications.requestPermissionsAsync();
        
        finalStatus = status;
      }
      // ユーザーが通知許可しなかった場合は処理を抜ける
      if (finalStatus !== 'granted') return;
      //alerttest("peremission");
      // デバイストークンを取得する
      try{
        const experienceId = '@torukurita/Scop' // (see docs on using expo credentials:manager)
      let token = await Notifications.getExpoPushTokenAsync({ experienceId });
       //alerttest(token);
       console.log("ntoken="+JSON.stringify(token));
       sendToken(token.data)
      }catch(e){
        console.log("ERROR=")
        console.log(e.message)
      }
    } else {
      console.log('プッシュ通知は、実機端末を使用してください。');
    }
  };

  React.useEffect(() => {
    //getUUid();
    //sendToken("ExponentPushToken[NYK85GCAAaz6oVBoJy-vWh]");
    //alerttest("TITLE3");
    registerForPushNotificationsAsync();
    // 用途：アプリがフォアグラウンドの時の振る舞いを定義
    // やっていること：起動中に通知を受け取った時の動作として、通知をstateに設定
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // 用途：ユーザの反応に応じて動作するリスナー
    // やっていること：ユーザが通知をタップしたときの動作を定義
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
      // 用途：クリーンアップ処理の定義
    // userEffectのreturnに登録する関数は、コンポーネントがunmountされるときに実行される。ここで主にcleanup処理を定義する
    // やっていること：クリーンアップ処理、第２引数の値が変わっているときだけ実行する、という絞り込みでパフォーマンス改善できる
    // クリーンアップ処理として、購読処理を停止している
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  },[])
    return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
               <Stack.Screen name="TOP" component={Top} />
               <Stack.Screen name="manage" component={mypage} />

      </Stack.Navigator>
    </NavigationContainer>

    );
  
}
