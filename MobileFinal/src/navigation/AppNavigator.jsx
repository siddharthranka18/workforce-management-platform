import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';


import BottomTabs from './BottomTabs';

import ProfileScreen from '../screens/ProfileScreen';



const Stack=createNativeStackNavigator();



const AppNavigator=()=>{


return(

<NavigationContainer>


<Stack.Navigator

screenOptions={{
headerShown:false
}}

>


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

)

}



export default AppNavigator;