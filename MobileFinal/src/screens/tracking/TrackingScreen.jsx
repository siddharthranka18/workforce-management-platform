import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';


const locations=[

{
time:'09:30 AM',
place:'Office Entry',
lat:'26.9124',
lng:'75.7873'
},

{
time:'12:15 PM',
place:'Client Location',
lat:'26.9140',
lng:'75.7900'
},

{
time:'03:00 PM',
place:'Warehouse Area',
lat:'26.9201',
lng:'75.8002'
}

];


const TrackingScreen=()=>{


return(

<ScrollView style={styles.container}>


<Text style={styles.title}>
Location Tracking
</Text>


<View style={styles.statusCard}>


<View style={styles.row}>

<Ionicons
name="radio-button-on"
size={24}
color="green"
/>

<Text style={styles.active}>
Tracking Active
</Text>

</View>


<Text style={styles.small}>
Last updated : 03:00 PM
</Text>


</View>



<Text style={styles.heading}>
Today's Location History
</Text>


{

locations.map((item,index)=>(


<View 
style={styles.locationCard}
key={index}
>


<View style={styles.row}>


<Ionicons
name="location"
size={26}
color="#2563EB"
/>


<View>


<Text style={styles.place}>
{item.place}
</Text>


<Text style={styles.time}>
{item.time}
</Text>


</View>


</View>



<Text style={styles.coords}>

Lat: {item.lat} | Lng: {item.lng}

</Text>



</View>


))


}



</ScrollView>

)

}


export default TrackingScreen;



const styles=StyleSheet.create({


container:{
flex:1,
backgroundColor:'#F5F7FB',
padding:20
},


title:{
fontSize:26,
fontWeight:'700',
marginTop:40
},


statusCard:{
backgroundColor:'white',
padding:20,
borderRadius:18,
marginTop:25,
elevation:3
},


row:{
flexDirection:'row',
alignItems:'center',
gap:12
},


active:{
fontSize:18,
fontWeight:'700'
},


small:{
marginTop:10,
color:'gray'
},


heading:{
fontSize:20,
fontWeight:'700',
marginTop:25,
marginBottom:15
},


locationCard:{
backgroundColor:'white',
padding:18,
borderRadius:15,
marginBottom:15,
elevation:3
},


place:{
fontSize:16,
fontWeight:'700'
},


time:{
color:'gray'
},


coords:{
marginTop:12,
color:'#555'
}


});