import React,{useState,useEffect} from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';

import {
View,
Text,
StyleSheet,
ScrollView,
TextInput,
TouchableOpacity
} from 'react-native';


import {Ionicons} from '@expo/vector-icons';


import AsyncStorage from
'@react-native-async-storage/async-storage';


import api from '../../api/api';





const ApplyLeaveScreen=()=>{


const [leaveType,setLeaveType]=useState('Full Day');

const [fromDate,setFromDate]=useState(new Date());

const [toDate,setToDate]=useState(new Date());

const [showFrom,setShowFrom]=useState(false);

const [showTo,setShowTo]=useState(false);

const [reason,setReason]=useState('');

const [requests,setRequests]=useState([]);

const [employee,setEmployee]=useState(null);





useEffect(()=>{


loadLeaves();


},[]);






const loadLeaves=async()=>{


try{


const data=await AsyncStorage.getItem("employee");


const emp=JSON.parse(data);


setEmployee(emp);




const response=await api.get(

`/leaves/${emp.id}`

);



setRequests(response.data);



}


catch(error){


console.log(
"LOAD LEAVE ERROR:",
error.message
);


}



};








const submitLeave=async()=>{

console.log("LEAVE BUTTON CLICKED");
try{


if(!employee){


console.log("Employee not loaded yet");


return;


}



const leaveData={


employee_id:employee.id,


leave_type:

leaveType==="Full Day"

?

"FULL_DAY"

:

"HALF_DAY",



from_date:

fromDate.toISOString().split("T")[0],



to_date:

leaveType==="Full Day"

?

toDate.toISOString().split("T")[0]

:

null,



reason:reason


};




console.log(

"SENDING LEAVE:",

leaveData

);




const response=await api.post(

"/leaves/apply",

leaveData

);



console.log(

"LEAVE RESPONSE:",

response.data

);




setReason("");



loadLeaves();




}



catch(error){



console.log(

"SUBMIT ERROR:",

error.response?.data || error.message

);



}



};








return(

<ScrollView style={styles.container}>


<Text style={styles.title}>

Apply Leave

</Text>






<Text style={styles.label}>

Leave Duration

</Text>





<View style={styles.typeRow}>




<TouchableOpacity


style={[

styles.typeButton,

leaveType==='Full Day' && styles.selected

]}


onPress={()=>setLeaveType('Full Day')}


>


<Text>

Full Day

</Text>



</TouchableOpacity>








<TouchableOpacity


style={[

styles.typeButton,

leaveType==='Half Day' && styles.selected

]}


onPress={()=>setLeaveType('Half Day')}


>


<Text>

Half Day

</Text>



</TouchableOpacity>




</View>









<TouchableOpacity

style={styles.input}

onPress={()=>setShowFrom(true)}

>


<Text>


{

leaveType==='Half Day'

?

'Date : '

:

'From : '

}


{fromDate.toDateString()}


</Text>


</TouchableOpacity>







{


showFrom &&


<DateTimePicker


value={fromDate}

mode="date"


onChange={(event,date)=>{


setShowFrom(false);


if(date){

setFromDate(date);

}


}}


/>


}









{


leaveType==='Full Day' &&


<>


<TouchableOpacity


style={styles.input}


onPress={()=>setShowTo(true)}

>


<Text>

To : {toDate.toDateString()}

</Text>


</TouchableOpacity>





{


showTo &&


<DateTimePicker


value={toDate}

mode="date"


onChange={(event,date)=>{


setShowTo(false);


if(date){

setToDate(date);

}


}}


/>


}



</>


}











<TextInput


placeholder="Reason"


style={[

styles.input,

styles.reason

]}


multiline


value={reason}


onChangeText={setReason}


/>








<TouchableOpacity


style={styles.submit}


onPress={submitLeave}


>


<Text style={styles.submitText}>

Submit Request

</Text>


</TouchableOpacity>











<Text style={styles.heading}>

My Leave Requests

</Text>








{


requests.map(item=>(


<View


style={styles.card}


key={item.id}


>





<View style={styles.row}>


<Ionicons


name="calendar"


size={25}


color="#2563EB"


/>






<View>



<Text style={styles.leave}>


{item.leave_type}


</Text>





<Text>


{item.from_date?.slice(0,10)}


{


item.to_date


?


" - "+item.to_date.slice(0,10)


:


""


}


</Text>





</View>




</View>









<Text


style={


item.status==="APPROVED"


?


styles.approved


:


styles.pending


}


>


{item.status}


</Text>







</View>


))


}






</ScrollView>


)


}








export default ApplyLeaveScreen;









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




label:{

fontWeight:'700',

marginBottom:10

},




typeRow:{

flexDirection:'row',

gap:15

},




typeButton:{

backgroundColor:'white',

padding:15,

borderRadius:12,

width:'45%',

alignItems:'center',

elevation:2

},




selected:{

borderWidth:2,

borderColor:'#2563EB'

},




input:{

backgroundColor:'white',

padding:15,

borderRadius:12,

marginTop:15

},




reason:{

height:90,

textAlignVertical:'top'

},




submit:{

backgroundColor:'#2563EB',

padding:15,

borderRadius:12,

alignItems:'center',

marginTop:20

},




submitText:{

color:'white',

fontWeight:'700'

},




heading:{

fontSize:20,

fontWeight:'700',

marginTop:30,

marginBottom:15

},




card:{

backgroundColor:'white',

padding:18,

borderRadius:15,

marginBottom:15,

elevation:3

},




row:{

flexDirection:'row',

gap:12,

alignItems:'center'

},




leave:{

fontWeight:'700',

fontSize:16

},




approved:{

color:'green',

fontWeight:'700',

marginTop:12

},




pending:{

color:'#D97706',

fontWeight:'700',

marginTop:12

}



});