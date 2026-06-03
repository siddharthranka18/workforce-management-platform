import React,{useState} from 'react';

import {
View,
Text,
StyleSheet,
ScrollView,
TouchableOpacity
} from 'react-native';

import {Ionicons} from '@expo/vector-icons';



const ComplaintListScreen=()=>{


const [complaints,setComplaints]=useState([

{
id:1,
customer:'ABC Industries',
issue:'Machine Service Request',
address:'Industrial Area Phase 2',
status:'Assigned'
},

{
id:2,
customer:'XYZ Office',
issue:'Network Issue',
address:'Main Road Branch',
status:'On The Way'
}

]);



const updateStatus=(id,status)=>{


const updated=complaints.map(item=>{


if(item.id===id){

return {
...item,
status:status
}

}


return item;


});


setComplaints(updated);


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
{item.customer}
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

item.status==='Assigned' &&


<TouchableOpacity

style={styles.button}

onPress={()=>updateStatus(
item.id,
'On The Way'
)}

>


<Text style={styles.btnText}>
Dispatch
</Text>


</TouchableOpacity>


}





{


item.status==='On The Way' &&


<TouchableOpacity

style={styles.button}

onPress={()=>updateStatus(
item.id,
'Reached Site'
)}

>


<Text style={styles.btnText}>
Reached Site
</Text>


</TouchableOpacity>


}




{


item.status==='Reached Site' &&


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