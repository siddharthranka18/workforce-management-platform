import * as Location from 'expo-location';


import api from '../api/api';





export const saveLocation=async(employeeId,type)=>{


try{


const permission=
await Location.requestForegroundPermissionsAsync();



if(permission.status!=="granted"){


console.log("Permission denied");


return;


}





const currentLocation=
await Location.getCurrentPositionAsync({

accuracy:Location.Accuracy.High

});





const latitude=currentLocation.coords.latitude;


const longitude=currentLocation.coords.longitude;





const addressData=

await Location.reverseGeocodeAsync({

latitude,

longitude

});






let address="Unknown Location";



if(addressData.length>0){


const place=addressData[0];



address=

`${place.name || ""}, ${place.city || ""}, ${place.region || ""}, ${place.country || ""}`;


}








console.log(

"LOCATION:",

latitude,

longitude,

address

);







await api.post(

"/locations/add",

{

employee_id:employeeId,

latitude,

longitude,

address,

type

}

);





console.log("LOCATION SAVED");





}



catch(error){



console.log(

"LOCATION ERROR",

error.message

);



}



};