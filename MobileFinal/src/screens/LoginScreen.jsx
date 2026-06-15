import React,{useState} from 'react';
import AsyncStorage from 
'@react-native-async-storage/async-storage';
import {saveLocation}
from '../services/locationService';
import {startTracking}
from '../services/trackingService';
import {
startBackgroundTracking
}
from '../services/backgroundLocationService';
import {
View,
Text,
TextInput,
StyleSheet,
TouchableOpacity,
Alert
} from 'react-native';


import Button from '../components/Button';

import api from '../api/api';



const LoginScreen=({navigation})=>{


const [email,setEmail]=useState('');

const [role,setRole]=useState('employee');





const handleLogin=async()=>{


if(email.trim()===""){

Alert.alert(

"Email Required",

"Please enter email ID for login"

);

return;

}

console.log("LOGIN BUTTON CLICKED");

console.log("ROLE:",role);
if(role==="employee"){


try{


console.log("APP EMAIL:",email);


const response=await api.post(

"/employees/login",

{
email:email.trim()
}

);


console.log("LOGIN RESPONSE:",response.data);


const employee=response.data.employee;


await AsyncStorage.setItem(

"employee",

JSON.stringify(employee)

);
await startBackgroundTracking();
await saveLocation(

employee.id,

"LOGIN"

);

startTracking(

employee.id

);


navigation.replace("Main");


}
catch(error){


alert(

"Invalid email ID"

);


console.log(

"LOGIN ERROR",

error.message

);


}

}


else{


navigation.replace("ManagerDashboard");


}



};






return(

<View style={styles.container}>


<Text style={styles.title}>
Workforce Management
</Text>


<Text style={styles.subtitle}>
Field Employee Portal
</Text>





<TextInput

placeholder="Enter Email "

placeholderTextColor="#6B7280"

value={email}

onChangeText={setEmail}

autoCapitalize="none"

style={styles.input}

/>




<TouchableOpacity

style={styles.loginButton}

onPress={handleLogin}

>


<Text style={styles.loginText}>

Login

</Text>


</TouchableOpacity>




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
},

loginButton:{

backgroundColor:'#2563EB',

padding:15,

borderRadius:10,

alignItems:'center',

marginTop:5

},





loginText:{

color:'white',

fontWeight:'700'

}

});