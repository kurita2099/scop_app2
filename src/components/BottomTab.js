import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Colors } from 'react-native-paper';
  
function BottomTab(props) {

    const go_home = (() =>{
	  props.navdo('Top')
    });
    const go_newpost = (() =>{
	  props.navdo('NewPost')
    });
    const go_ManagerTop = (() =>{
	  props.navdo('ManageScreen')
     });
    const openSearch = (() =>{
      if(props.opensearch){
        props.opensearch("sasasas");
      }
    });
    return (
    <View style={[styles.container, props.style]}>
	<View style={styles.icon4Row}>
	    <IconButton
	      icon="home"
	      style={styles.icon}
	      color={Colors.blue500}
	      size={30}
		onPress={go_home}
	  />

	  <IconButton
	      icon="account"
	      style={styles.icon}
	      color={Colors.blue500}
	      size={30}
	      onPress={go_ManagerTop}
	  />
          
	  <IconButton
	      icon="pen"
	      style={styles.icon}
	      color={Colors.blue500}
	      size={30}
	      onPress={go_newpost}
	  />

	  <IconButton
	      icon="feature-search-outline"
	      style={styles.icon}
	      color={Colors.blue500}
	      size={25}
	      onPress={openSearch}
	  />

      </View>
    </View>
  );
}
 

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row"
  },
  icon4: {
    color: "rgba(29,129,230,1)",
    fontSize: 46
  },
  icon3: {
    color: "rgba(29,129,230,1)",
    fontSize: 42,
    marginLeft: 51
  },
  icon2: {
    color: "rgba(0,0,0,0)",
    fontSize: 60,
      marginLeft: 20,
    marginTop: 2
  },
  icon: {
    color: "rgba(29,129,230,1)",
    fontSize: 50,
    marginLeft: 35,
    marginTop: 3,
    flex: 1,
  },
  icon4Row: {
    height: 50,
    flexDirection: "row",
    flex: 1,
    marginRight: 33,
    marginLeft: 0,
    marginTop: 3
  }
});

export default BottomTab;
