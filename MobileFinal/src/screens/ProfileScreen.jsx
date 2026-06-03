import React from 'react';

import {
View,
Text,
StyleSheet,
TouchableOpacity,
ScrollView
} from 'react-native';


import {Ionicons} from '@expo/vector-icons';



const ProfileScreen=()=>{


return(

<ScrollView style={styles.container}>


<View style={styles.header}>


<Ionicons

name="person-circle"

size={100}

color="#2563EB"

/>


<Text style={styles.name}>
Siddharth Ranka
</Text>


<Text style={styles.role}>
Field Worker
</Text>


</View>





<View style={styles.card}>



<Info

icon="id-card"

label="Employee ID"

value="EMP001"

/>



<Info

icon="mail"

label="Email"

value="siddharth@gmail.com"

/>




<Info

icon="call"

label="Phone"

value="+91 9876543210"

/>



<Info

icon="business"

label="Department"

value="Service Team"

/>




</View>





<TouchableOpacity style={styles.logout}>


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