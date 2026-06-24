const express=require("express");



const {

addLocation,

getLocations,

getAttendanceStatus


}=require("../controllers/locationController");




const router=express.Router();







router.post(

"/add",

addLocation

);






router.get(

"/attendance/:employeeId",

getAttendanceStatus

);







router.get(

"/:employeeId",

getLocations

);





module.exports=router;