import React,{useEffect,useState} from 'react';


import {
View,
Text,
StyleSheet,
ActivityIndicator
}
from 'react-native';


import AsyncStorage
from '@react-native-async-storage/async-storage';






const SplashScreen=({navigation})=>{


const [internet,setInternet] =
useState(true);





useEffect(()=>{


checkInternet();


const interval=setInterval(()=>{

checkInternet();

},3000);



return()=>clearInterval(interval);



},[]);







const checkInternet=async()=>{


try{


await fetch(
"https://www.google.com"
);



setInternet(true);



const employee =
await AsyncStorage.getItem(
"employee"
);




if(employee){


navigation.replace(
"Main"
);


}


else{


navigation.replace(
"Login"
);


}




}



catch(error){



setInternet(false);



}



};








return(

<View style={styles.container}>


<Text style={styles.logo}>

Workforce Management

</Text>





{

internet

?

<ActivityIndicator

size="large"

color="#2563EB"

/>

:

<Text style={styles.error}>

No Internet Connection

</Text>


}




</View>


);


};







export default SplashScreen;









const styles=StyleSheet.create({



container:{

flex:1,

justifyContent:'center',

alignItems:'center',

backgroundColor:'#F5F7FB'

},





logo:{

fontSize:26,

fontWeight:'700',

marginBottom:30,

color:'#2563EB'

},




error:{

color:'red',

fontSize:16,

fontWeight:'600'

}



});