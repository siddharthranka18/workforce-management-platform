import React,{useEffect,useState} from 'react';

import {NavigationContainer} 
from '@react-navigation/native';

import {createNativeStackNavigator} 
from '@react-navigation/native-stack';

import AsyncStorage 
from '@react-native-async-storage/async-storage';


import LoginScreen from '../screens/LoginScreen';

import BottomTabs from './BottomTabs';

import ProfileScreen from '../screens/ProfileScreen';



const Stack =
createNativeStackNavigator();




const AppNavigator=()=>{


const [loading,setLoading] =
useState(true);


const [initialScreen,setInitialScreen] =
useState("Login");




useEffect(()=>{


checkLogin();


},[]);





const checkLogin =
async()=>{


const employee =
await AsyncStorage.getItem(
"employee"
);



if(employee){


setInitialScreen(
"Main"
);


}


else{


setInitialScreen(
"Login"
);


}




setLoading(false);



};





if(loading){

return null;

}





return(

<NavigationContainer>


<Stack.Navigator


initialRouteName={initialScreen}


screenOptions={{

headerShown:false

}}

>


<Stack.Screen

name="Login"

component={LoginScreen}

/>



<Stack.Screen

name="Main"

component={BottomTabs}

/>



<Stack.Screen

name="Profile"

component={ProfileScreen}

/>



</Stack.Navigator>



</NavigationContainer>


);


};




export default AppNavigator;