import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
export default class App extends React.Component {
   
    constructor(props) {
      super(props);
      this.state = {
        country: null,
        countries: []
      };
    }
    
    render() {
      return (
        <View style={styles.container}>
 <DropDownPicker
    items={[
        {label: 'JAPAN', value: 'noselect', icon: () => <Icon name="flag" size={18} color="#900" />, hidden: true},
        {label: 'USA', value: 'usa', icon: () => <Icon name="flag" size={18} color="#900" />},
        {label: 'UK', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" />},
        {label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" />},
        
    ]}
    value={this.state.country}
    containerStyle={{height: 40}}
    style={{backgroundColor: '#fafafa'}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={item => {
      this.setState({
        country: item.value  
    });
    console.log(this.state.country);
  }
  }
    placeholder = "選択してください" 
    placeholderStyle = {{
        fontWeight: 'bold',
        textAlign: 'center'
    }}
    />
        </View>
      );
    }
    
  }
 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 80
    },
  });