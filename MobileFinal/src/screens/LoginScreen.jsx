import React, {useState} from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Button from '../components/Button';


const LoginScreen = ({navigation}) => {


const [email,setEmail]=useState('');

const [role,setRole]=useState('employee');


const handleLogin=()=>{

 if(role==="employee"){
   navigation.replace("Main");
 }
 else{
    navigation.replace("ManagerDashboard");
 }

}


return(

<View style={styles.container}>


<Text style={styles.title}>
Workforce Management
</Text>


<Text style={styles.subtitle}>
Field Employee Portal
</Text>



<TextInput

placeholder="Enter Email ID"

value={email}

onChangeText={setEmail}

style={styles.input}

/>



<Button 
title="Login"
onPress={handleLogin}
/>



<Text style={styles.demo}>
Demo Login
</Text>


<View style={styles.roleBox}>


<TouchableOpacity

onPress={()=>setRole("employee")}

style={[
styles.role,
role==="employee" && styles.active
]}

>

<Text>
Employee
</Text>


</TouchableOpacity>



<TouchableOpacity

onPress={()=>setRole("manager")}

style={[
styles.role,
role==="manager" && styles.active
]}

>

<Text>
Manager
</Text>


</TouchableOpacity>


</View>



</View>

)

}


export default LoginScreen;



const styles=StyleSheet.create({


container:{
flex:1,
justifyContent:'center',
padding:24,
backgroundColor:'#F5F7FB'
},


title:{
fontSize:28,
fontWeight:'700',
color:'#111827',
textAlign:'center'
},


subtitle:{
textAlign:'center',
color:'#6B7280',
marginBottom:40,
marginTop:5
},


input:{
backgroundColor:'#fff',
padding:15,
borderRadius:10,
marginBottom:15,
fontSize:16
},


demo:{
textAlign:'center',
marginTop:20,
color:'#6B7280'
},


roleBox:{
flexDirection:'row',
marginTop:10,
justifyContent:'center'
},


role:{
padding:12,
backgroundColor:'#fff',
marginHorizontal:5,
borderRadius:10,
width:110,
alignItems:'center'
},


active:{
backgroundColor:'#BFDBFE'
}


});