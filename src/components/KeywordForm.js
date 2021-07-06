import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";

function KeywordForm(props) {
  const handleChange =(val) => {
   // const name = event.target && event.target.name;
   // const value = event.target && event.target.value;
  
    //console.log(val)
    props.sendKeyword(val)
  }
  return (
    <View style={[styles.container, props.style]}>
      <TextInput placeholder="キーワード" style={styles.キーワード} onChangeText={handleChange}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(230,230, 230,0)",
    borderWidth: 1,
    borderColor: "rgba(29,129,230,1)",
    borderRadius: 8
  },
  キーワード: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 25,
    width: 200,
    marginTop: 10,
    marginLeft: 22
  }
});

export default KeywordForm;