import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../api/api';


const LOCATION_TASK_NAME = 'background-location-task';




// BACKGROUND TASK
TaskManager.defineTask(
LOCATION_TASK_NAME,

async ({ data, error }) => {


try{


if(error){

console.log(
"BACKGROUND ERROR",
error
);

return;

}



const location =
data?.locations?.[0];



if(!location){

return;

}



const employeeData =
await AsyncStorage.getItem("employee");



if(!employeeData){

console.log(
"NO EMPLOYEE FOUND"
);

return;

}




const employee =
JSON.parse(employeeData);



const latitude =
location.coords.latitude;


const longitude =
location.coords.longitude;




let address =
"Unknown";



const addressData =
await Location.reverseGeocodeAsync({

latitude,

longitude

});



if(addressData.length>0){


const place =
addressData[0];


address=[

place.name,
place.street,
place.district,
place.city,
place.region,
place.postalCode,
place.country

]

.filter(Boolean)

.join(", ");

}





await api.post(

"/locations/add",

{

employee_id:
employee.id,


latitude,


longitude,


address,


type:
"TRACKING"

}

);




console.log(

"BACKGROUND LOCATION SAVED",

new Date().toLocaleTimeString()

);



}


catch(err){


console.log(

"BACKGROUND SAVE FAILED",

err.message

);


}



}

);








// START TRACKING

export const startBackgroundTracking =
async()=>{





await Notifications.requestPermissionsAsync();





const foreground =

await Location.requestForegroundPermissionsAsync();



if(foreground.status !== "granted"){


console.log(
"FOREGROUND DENIED"
);


return;


}





const background =

await Location.requestBackgroundPermissionsAsync();



if(background.status !== "granted"){


console.log(
"BACKGROUND DENIED"
);


return;


}








const alreadyStarted =

await Location.hasStartedLocationUpdatesAsync(

LOCATION_TASK_NAME

);





// IMPORTANT
// remove old config

if(alreadyStarted){



await Location.stopLocationUpdatesAsync(

LOCATION_TASK_NAME

);



console.log(

"OLD TRACKING STOPPED"

);


}






// always start fresh

await Location.startLocationUpdatesAsync(

LOCATION_TASK_NAME,

{


accuracy:

Location.Accuracy.High,



timeInterval:

15*60*1000,



distanceInterval:

100,



pausesUpdatesAutomatically:

false,



foregroundService:{


notificationTitle:

"Workforce Tracking",



notificationBody:

"Location tracking active",



notificationColor:

"#2563EB",



killServiceOnDestroy:

false


}



}

);





console.log(

"BACKGROUND TRACKING STARTED"

);



};









// STOP TRACKING


export const stopBackgroundTracking =
async()=>{



const started =

await Location.hasStartedLocationUpdatesAsync(

LOCATION_TASK_NAME

);




if(started){



await Location.stopLocationUpdatesAsync(

LOCATION_TASK_NAME

);



console.log(

"BACKGROUND TRACKING STOPPED"

);



}



};