import React from 'react';

import {
 View,
 StyleSheet
} from 'react-native';


const Card=({children})=>{

return(

<View style={styles.card}>

{children}

</View>

)

}

export default Card;


const styles=StyleSheet.create({

card:{
 backgroundColor:'#fff',
 padding:16,
 borderRadius:12,
 marginVertical:8,

 elevation:3,

 shadowColor:'#000',
 shadowOpacity:0.1,
 shadowRadius:5,
}

});