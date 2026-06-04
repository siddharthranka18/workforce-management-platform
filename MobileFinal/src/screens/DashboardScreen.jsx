import React,{useEffect,useState} from 'react';
import AsyncStorage from 
'@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';


const DashboardScreen = ({navigation}) => {
const [employee,setEmployee]=useState(null);



useEffect(()=>{


const loadEmployee=async()=>{


const data=await AsyncStorage.getItem("employee");


if(data){


setEmployee(JSON.parse(data));


}


};


loadEmployee();


},[]);

return (

<ScrollView style={styles.container}>


{/* Header */}

<View style={styles.header}>

<View>

<Text style={styles.greeting}>
Hello,
</Text>

<Text style={styles.name}>

{employee?.name || "Employee"} 👋

</Text>
</View>


<TouchableOpacity

onPress={()=>
navigation.navigate('Profile')
}

>

<Ionicons

name="person-circle"

size={42}

color="#2563EB"

/>

</TouchableOpacity>

</View>



{/* Status Card */}

<View style={styles.statusCard}>

<Text style={styles.cardTitle}>
Today's Status
</Text>


<View style={styles.row}>

<Ionicons
name="checkmark-circle"
size={28}
color="green"
/>

<Text style={styles.active}>
Active
</Text>

</View>


<Text style={styles.smallText}>
Check-in Time : 09:30 AM
</Text>

</View>



{/* Stats */}

<Text style={styles.sectionTitle}>
Overview
</Text>


<View style={styles.statsContainer}>


<View style={styles.statBox}>

<Ionicons
name="location"
size={28}
color="#2563EB"
/>

<Text style={styles.number}>
12
</Text>

<Text>
Locations
</Text>

</View>




<View style={styles.statBox}>

<Ionicons
name="document-text"
size={28}
color="#2563EB"
/>

<Text style={styles.number}>
3
</Text>

<Text>
Complaints
</Text>

</View>



<View style={styles.statBox}>

<Ionicons
name="calendar"
size={28}
color="#2563EB"
/>

<Text style={styles.number}>
2
</Text>

<Text>
Leaves
</Text>

</View>



</View>



{/* Activity */}


<Text style={styles.sectionTitle}>
Recent Activity
</Text>



<View style={styles.activity}>


<Text>
📍 Location updated at 12:00 PM
</Text>


<Text>
📝 Complaint assigned
</Text>




</View>



</ScrollView>

)


}


export default DashboardScreen;




const styles = StyleSheet.create({


container:{
flex:1,
backgroundColor:'#F5F7FB',
padding:20
},


header:{
marginTop:35,
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center'
},


greeting:{
fontSize:16,
color:'gray'
},


name:{
fontSize:25,
fontWeight:'700'
},


statusCard:{
backgroundColor:'white',
padding:20,
borderRadius:18,
marginTop:25,
elevation:4
},


cardTitle:{
fontSize:18,
fontWeight:'700',
marginBottom:15
},


row:{
flexDirection:'row',
alignItems:'center',
gap:10
},


active:{
fontSize:18,
fontWeight:'600'
},


smallText:{
marginTop:10,
color:'gray'
},


sectionTitle:{
fontSize:20,
fontWeight:'700',
marginTop:25,
marginBottom:15
},


statsContainer:{
flexDirection:'row',
justifyContent:'space-between'
},


statBox:{
backgroundColor:'white',
width:'31%',
padding:15,
alignItems:'center',
borderRadius:15,
elevation:3
},


number:{
fontSize:22,
fontWeight:'700',
marginVertical:5
},


activity:{
backgroundColor:'white',
padding:20,
borderRadius:15,
gap:12,
marginBottom:30
}


});