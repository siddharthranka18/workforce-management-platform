import React,{useEffect,useState} from 'react';

import {
View,
Text,
StyleSheet,
TouchableOpacity,
ScrollView
} from 'react-native';


import {Ionicons} from '@expo/vector-icons';

import AsyncStorage from
'@react-native-async-storage/async-storage';




const ProfileScreen=({navigation})=>{


const [employee,setEmployee]=useState(null);




useEffect(()=>{


loadEmployee();


},[]);





const loadEmployee=async()=>{


const data=await AsyncStorage.getItem("employee");


if(data){


setEmployee(JSON.parse(data));


}


};





const logout=async()=>{


await AsyncStorage.removeItem("employee");


navigation.replace("Login");


};






return(

<ScrollView style={styles.container}>


<View style={styles.header}>


<Ionicons

name="person-circle"

size={100}

color="#2563EB"

/>


<Text style={styles.name}>

{employee?.name}

</Text>


<Text style={styles.role}>

Field Worker

</Text>


</View>







<View style={styles.card}>



<Info

icon="id-card"

label="Employee ID"

value={`EMP00${employee?.id}`}

/>





<Info

icon="mail"

label="Email"

value={employee?.email}

/>






<Info

icon="call"

label="Phone"

value={employee?.phone}

/>





<Info

icon="business"

label="Department"

value={employee?.department}

/>






</View>








<TouchableOpacity

style={styles.logout}

onPress={logout}

>


<Ionicons

name="log-out"

size={22}

color="white"

/>


<Text style={styles.logoutText}>

Logout

</Text>


</TouchableOpacity>





</ScrollView>


)


}









const Info=({icon,label,value})=>{


return(

<View style={styles.infoRow}>


<Ionicons

name={icon}

size={24}

color="#2563EB"

/>



<View>


<Text style={styles.label}>

{label}

</Text>


<Text style={styles.value}>

{value}

</Text>


</View>


</View>


)


}






export default ProfileScreen;









const styles=StyleSheet.create({


container:{
flex:1,
backgroundColor:'#F5F7FB',
padding:20
},



header:{
alignItems:'center',
marginTop:45
},



name:{
fontSize:24,
fontWeight:'700'
},



role:{
color:'gray',
marginTop:5
},



card:{
backgroundColor:'white',
borderRadius:18,
padding:20,
marginTop:30,
elevation:3
},



infoRow:{
flexDirection:'row',
alignItems:'center',
gap:15,
marginBottom:22
},



label:{
color:'gray'
},



value:{
fontSize:16,
fontWeight:'600'
},



logout:{
backgroundColor:'#DC2626',
padding:15,
borderRadius:12,
flexDirection:'row',
justifyContent:'center',
alignItems:'center',
gap:10,
marginTop:30
},



logoutText:{
color:'white',
fontWeight:'700',
fontSize:16
}


});