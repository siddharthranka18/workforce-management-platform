import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';


import DashboardScreen from '../screens/DashboardScreen';
import TrackingScreen from '../screens/tracking/TrackingScreen';
import ComplaintListScreen from '../screens/complaints/ComplaintListScreen';
import ApplyLeaveScreen from '../screens/leave/ApplyLeaveScreen';


const Tab = createBottomTabNavigator();


const BottomTabs = () => {


return (

<Tab.Navigator

screenOptions={({route})=>({

headerShown:false,


tabBarStyle:{
height:70,
paddingBottom:12,
paddingTop:8,
backgroundColor:'#fff',
},


tabBarLabelStyle:{
fontSize:12,
fontWeight:'600'
},


tabBarIcon:({color,size})=>{


let icon;


if(route.name==='Dashboard'){
icon='home';
}

else if(route.name==='Tracking'){
icon='location';
}

else if(route.name==='Complaints'){
icon='document-text';
}

else{
icon='calendar';
}


return (

<Ionicons
name={icon}
size={24}
color={color}
/>

)

}


})}

>


<Tab.Screen
name="Dashboard"
component={DashboardScreen}
/>


<Tab.Screen
name="Tracking"
component={TrackingScreen}
/>


<Tab.Screen
name="Complaints"
component={ComplaintListScreen}
/>


<Tab.Screen
name="Leave"
component={ApplyLeaveScreen}
/>


</Tab.Navigator>

)


}


export default BottomTabs;