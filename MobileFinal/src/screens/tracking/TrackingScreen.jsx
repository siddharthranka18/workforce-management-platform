import React,{useState,useEffect} from 'react';


import {
View,
Text,
StyleSheet,
ScrollView
} from 'react-native';


import { Ionicons } from '@expo/vector-icons';


import AsyncStorage from
'@react-native-async-storage/async-storage';


import api from '../../api/api';





const TrackingScreen=()=>{


const [locations,setLocations]=useState([]);





useEffect(()=>{


loadLocations();


},[]);







const loadLocations=async()=>{


try{


const data=await AsyncStorage.getItem("employee");


const employee=JSON.parse(data);



const response=await api.get(

`/locations/${employee.id}`

);



setLocations(response.data);



}


catch(error){


console.log(

"LOCATION LOAD ERROR:",

error.message

);


}



};







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


Total Records : {locations.length}


</Text>




</View>







<Text style={styles.heading}>

Location History

</Text>







{


locations.map(item=>(


<View


style={styles.locationCard}


key={item.id}


>





<View style={styles.row}>


<Ionicons


name="location"


size={26}


color="#2563EB"


/>




<View>



<Text style={styles.place}>


Location Captured


</Text>





<Text style={styles.time}>


{

new Date(item.captured_at)
.toLocaleString()

}


</Text>




</View>



</View>






<Text style={styles.coords}>


Lat: {item.latitude}

{"\n"}

Lng: {item.longitude}


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