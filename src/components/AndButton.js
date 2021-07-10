import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function AndButton(props) {
  const onPress = ()=>{
    if(props.onpress){
      props.onpress("and");
    }
  };
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={onPress}>
      <Text style={styles.and}>AND</Text>
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
    paddingRight: 16,
    borderWidth: 1,
    borderColor: "#000000"
  },
  and: {
    color: "#fff",
    fontSize: 14
  }
});

export default AndButton;