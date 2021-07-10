import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function OrButton(props) {
  const onPress = ()=>{
    if(props.onpress){
      props.onpress("or");
    }
  };
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={onPress}>
      <Text style={styles.or}>OR</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16
  },
  or: {
    color: "#fff",
    fontSize: 14
  }
});

export default OrButton;