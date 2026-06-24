import React,{useEffect,useState} from 'react';


import AsyncStorage from
'@react-native-async-storage/async-storage';


import {saveLocation}
from '../services/locationService';


import {
View,
Text,
StyleSheet,
ScrollView,
TouchableOpacity,
ActivityIndicator,
Alert
} from 'react-native';


import {Ionicons}
from '@expo/vector-icons';


import api from '../api/api';








const DashboardScreen=({navigation})=>{


const [employee,setEmployee]=useState(null);


const [loading,setLoading]=useState(true);
const [attendanceLoading,setAttendanceLoading]
=
useState(false);
const [attendanceStatus,setAttendanceStatus]
=
useState("NOT_CHECKED_IN");

const [stats,setStats]=useState({

locations:0,

visits:0,

leaves:0

});








useEffect(()=>{


loadDashboard();


},[]);









const loadDashboard=async()=>{


try{


setLoading(true);



const data =
await AsyncStorage.getItem(
"employee"
);



const emp =
JSON.parse(data);



setEmployee(emp);





const response =
await api.get(

`/dashboard/${emp.id}`

);




setStats(response.data);

const attendance =
await api.get(

`/locations/attendance/${emp.id}`

);



setAttendanceStatus(

attendance.data.status

);

}


catch(error){


console.log(

"DASHBOARD ERROR:",

error.message

);


}



finally{


setLoading(false);


}



};










const handleAttendance=async()=>{


try{


if(!employee){

return;

}




if(attendanceStatus==="NOT_CHECKED_IN"){



await saveLocation(

employee.id,

"CHECK_IN"

);



Alert.alert(

"Checked In",

"Your check in has been recorded"

);



}





else if(attendanceStatus==="CHECKED_IN"){



await saveLocation(

employee.id,

"CHECK_OUT"

);



Alert.alert(

"Checked Out",

"Your check out has been recorded"

);



}




loadDashboard();




}



catch(error){


Alert.alert(

"Error",

"Attendance update failed"

);


}



};









if(loading){


return(

<View style={styles.loader}>


<ActivityIndicator

size="large"

color="#2563EB"

/>



<Text style={styles.loadingText}>

Loading latest data...

</Text>


</View>


);


}










return(

<ScrollView style={styles.container}>







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

onPress={()=>navigation.navigate('Profile')}

>


<Ionicons

name="person-circle"

size={42}

color="#2563EB"

/>


</TouchableOpacity>



</View>











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


Employee ID : {employee?.id}


</Text>




</View>











{


attendanceStatus!=="COMPLETED"

?


<TouchableOpacity

style={styles.attendanceButton}

onPress={handleAttendance}

>


<Ionicons

name={

attendanceStatus==="NOT_CHECKED_IN"

?

"log-in"

:

"log-out"

}

size={24}

color="white"

/>



<Text style={styles.attendanceText}>


{

attendanceStatus==="NOT_CHECKED_IN"

?

"Check In"

:

"Check Out"

}


</Text>


</TouchableOpacity>


:


<View style={styles.completedBox}>


<Ionicons

name="checkmark-done"

size={24}

color="green"

/>


<Text style={styles.completedText}>

Attendance Completed

</Text>


</View>


}






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

{stats.locations}

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

{stats.visits}

</Text>




<Text>

Visits

</Text>



</View>










<View style={styles.statBox}>


<Ionicons

name="calendar"

size={28}

color="#2563EB"

/>



<Text style={styles.number}>

{stats.leaves}

</Text>




<Text>

Leaves

</Text>



</View>





</View>









<Text style={styles.sectionTitle}>

Recent Activity

</Text>






<View style={styles.activity}>


<Text>

📍 {stats.locations} location records

</Text>



<Text>

📝 {stats.visits} field visits assigned

</Text>



<Text>

📅 {stats.leaves} leave requests

</Text>




</View>





</ScrollView>


);


};









export default DashboardScreen;









const styles=StyleSheet.create({



container:{

flex:1,

backgroundColor:'#F5F7FB',

padding:20

},





loader:{

flex:1,

justifyContent:'center',

alignItems:'center',

backgroundColor:'#F5F7FB'

},




loadingText:{

marginTop:15,

color:'#6B7280',

fontWeight:'600'

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






attendanceButton:{

backgroundColor:'#2563EB',

padding:15,

borderRadius:12,

marginTop:20,

flexDirection:'row',

justifyContent:'center',

alignItems:'center',

gap:10

},





attendanceText:{

color:'white',

fontSize:16,

fontWeight:'700'

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

},
completedBox:{

backgroundColor:'#DCFCE7',

padding:15,

borderRadius:12,

marginTop:20,

flexDirection:'row',

justifyContent:'center',

alignItems:'center',

gap:10

},



completedText:{

color:'green',

fontWeight:'700',

fontSize:16

}


});