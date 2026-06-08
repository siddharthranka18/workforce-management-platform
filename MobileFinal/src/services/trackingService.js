import {saveLocation}
from './locationService';




let trackingInterval=null;





export const startTracking=(employeeId)=>{


if(trackingInterval){


console.log("TRACKING ALREADY RUNNING");


return;


}





console.log("TRACKING STARTED");





trackingInterval=setInterval(()=>{


console.log("TRACKING LOCATION SAVING");



saveLocation(

employeeId,

"TRACKING"

);



},


// testing
10000


// final 15 min:
// 15*60*1000


);



};









export const stopTracking=()=>{


if(trackingInterval){



clearInterval(

trackingInterval

);



trackingInterval=null;




console.log("TRACKING STOPPED");



}



};