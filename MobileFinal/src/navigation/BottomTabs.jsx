import React from 'react';

import {
createBottomTabNavigator
}
from '@react-navigation/bottom-tabs';


import {Ionicons}
from '@expo/vector-icons';


import DashboardScreen 
from '../screens/DashboardScreen';

import TrackingScreen 
from '../screens/tracking/TrackingScreen';

import ComplaintListScreen 
from '../screens/complaints/ComplaintListScreen';

import ApplyLeaveScreen 
from '../screens/leave/ApplyLeaveScreen';





const Tab =
createBottomTabNavigator();





const BottomTabs=()=>{


return(


<Tab.Navigator


screenOptions={({route})=>({


headerShown:false,


tabBarStyle:{

height:115,

paddingBottom:35,

paddingTop:8,

backgroundColor:'#fff',

borderTopWidth:0,

elevation:8

},




tabBarLabelStyle:{

fontSize:11,

fontWeight:'600',

marginTop:3

},




tabBarIconStyle:{

marginTop:5

},




tabBarActiveTintColor:

'#2563EB',



tabBarInactiveTintColor:

'#6B7280',






tabBarIcon:({color})=>{



let icon;




if(route.name==='Dashboard'){

icon='home';

}


else if(route.name==='Tracking'){

icon='location';

}


else if(route.name==='Field Visits'){

icon='calendar';

}


else{

icon='document-text';

}




return(

<Ionicons

name={icon}

size={23}

color={color}

/>

);



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

name="Field Visits"

component={ComplaintListScreen}

/>




<Tab.Screen

name="Leave"

component={ApplyLeaveScreen}

/>




</Tab.Navigator>


);


};





export default BottomTabs;