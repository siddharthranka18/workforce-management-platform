import React,{useState,useEffect} from 'react';

import {
View,
Text,
StyleSheet,
ScrollView,
TouchableOpacity,
Alert
} from 'react-native';


import {Ionicons} from '@expo/vector-icons';

import AsyncStorage from 
'@react-native-async-storage/async-storage';

import api from '../../api/api';



const ComplaintListScreen=()=>{


const [complaints,setComplaints]=useState([]);





useEffect(()=>{


loadVisits();


},[]);





const loadVisits=async()=>{


try{


const data=await AsyncStorage.getItem("employee");


const employee=JSON.parse(data);



const response=await api.get(

`/visits/${employee.id}`

);



setComplaints(response.data);



}


catch(error){


console.log(error.message);


}



};







const dispatchVisit=async(id)=>{


try{


await api.put(

`/visits/dispatch/${id}`,

{
latitude:26.4499,
longitude:74.6399
}

);



loadVisits();



}


catch(error){


Alert.alert(
"Error",
"Dispatch failed"
);


}



};









const reachedVisit=async(id)=>{


try{


await api.put(

`/visits/reached/${id}`,

{
latitude:26.4520,
longitude:74.6410
}

);



loadVisits();



}


catch(error){


Alert.alert(
"Error",
"Update failed"
);


}



};









return(

<ScrollView style={styles.container}>


<Text style={styles.title}>
Field Visits
</Text>



{

complaints.map(item=>(


<View

style={styles.card}

key={item.id}

>



<View style={styles.row}>


<Ionicons

name="briefcase"

size={28}

color="#2563EB"

/>



<View style={{flex:1}}>


<Text style={styles.customer}>

{item.customer_name}

</Text>



<Text style={styles.issue}>

{item.issue}

</Text>



</View>



</View>






<View style={styles.infoBox}>


<Text>

📍 {item.address}

</Text>



<Text style={styles.status}>

Status : {item.status}

</Text>



</View>






{


item.status==="ASSIGNED" &&


<TouchableOpacity

style={styles.button}

onPress={()=>dispatchVisit(item.id)}

>


<Text style={styles.btnText}>

Dispatch

</Text>


</TouchableOpacity>


}








{


item.status==="ON_THE_WAY" &&


<TouchableOpacity

style={styles.button}

onPress={()=>reachedVisit(item.id)}

>


<Text style={styles.btnText}>

Reached Site

</Text>



</TouchableOpacity>


}







{


item.status==="REACHED" &&


<View style={styles.completed}>


<Ionicons

name="checkmark-circle"

size={22}

color="green"

/>


<Text>

Location Verified

</Text>


</View>


}




</View>


))

}



</ScrollView>


)


}



export default ComplaintListScreen;






const styles=StyleSheet.create({


container:{
flex:1,
backgroundColor:'#F5F7FB',
padding:20
},


title:{
fontSize:26,
fontWeight:'700',
marginTop:40,
marginBottom:20
},



card:{
backgroundColor:'white',
padding:18,
borderRadius:16,
marginBottom:15,
elevation:3
},



row:{
flexDirection:'row',
alignItems:'center',
gap:12
},



customer:{
fontSize:17,
fontWeight:'700'
},



issue:{
color:'gray'
},



infoBox:{
marginTop:18,
gap:8
},



status:{
fontWeight:'700'
},



button:{
backgroundColor:'#2563EB',
padding:14,
borderRadius:12,
alignItems:'center',
marginTop:18
},



btnText:{
color:'white',
fontWeight:'700'
},



completed:{
marginTop:18,
flexDirection:'row',
alignItems:'center',
gap:8
}


});