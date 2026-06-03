import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const Button = ({title,onPress}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}>

      <Text style={styles.text}>
        {title}
      </Text>

    </TouchableOpacity>
  );
};

export default Button;


const styles = StyleSheet.create({

  button:{
    backgroundColor:'#2563EB',
    padding:14,
    borderRadius:10,
    alignItems:'center',
    marginVertical:8,
  },

  text:{
    color:'#fff',
    fontSize:16,
    fontWeight:'600'
  }

});