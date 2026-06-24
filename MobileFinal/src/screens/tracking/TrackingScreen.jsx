import React,{useState,useCallback} from 'react';

import {useFocusEffect}
from '@react-navigation/native';


import {
View,
Text,
StyleSheet,
ScrollView,
ActivityIndicator
} from 'react-native';


import {Ionicons}
from '@expo/vector-icons';


import AsyncStorage
from '@react-native-async-storage/async-storage';


import api from '../../api/api';






const TrackingScreen=()=>{


const [locations,setLocations]=useState([]);

const [loading,setLoading]=useState(true);





useFocusEffect(

useCallback(()=>{


let interval;



const startTrackingRefresh=async()=>{


await loadLocations();



interval=setInterval(()=>{


loadLocations();


},10000);



};




startTrackingRefresh();




return()=>{


if(interval){

clearInterval(interval);

}


};



},[])


);









const loadLocations=async()=>{


try{


const data =
await AsyncStorage.getItem(
"employee"
);



if(!data){

return;

}



const employee =
JSON.parse(data);




const response =
await api.get(

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



finally{


setLoading(false);


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

Loading locations...

</Text>



</View>


);


}









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




<View style={styles.addressBox}>


<Text

style={styles.place}

numberOfLines={2}

>

{item.address || "Location Captured"}

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


Latitude : {item.latitude}

{"\n"}

Longitude : {item.longitude}

{"\n"}

Type : {item.type}


</Text>




</View>


))


}






</ScrollView>


);


};







export default TrackingScreen;









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

alignItems:'flex-start',

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





addressBox:{

flex:1

},




place:{

fontSize:16,

fontWeight:'700',

flexWrap:'wrap',

color:'#111827'

},




time:{

color:'gray',

marginTop:3

},





coords:{

marginTop:12,

color:'#555'

}



});