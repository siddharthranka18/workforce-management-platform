const express=require("express");


const {

addLocation,

getLocations


}=require("../controllers/locationController");



const router=express.Router();





router.post(

"/add",

addLocation

);




router.get(

"/:employeeId",

getLocations

);

module.exports=router;