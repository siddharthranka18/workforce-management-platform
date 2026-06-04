const express=require("express");


const {

getVisits,

dispatchVisit,

reachedVisit


}=require("../controllers/visitController");




const router=express.Router();




router.get(

"/:employeeId",

getVisits

);




router.put(

"/dispatch/:visitId",

dispatchVisit

);




router.put(

"/reached/:visitId",

reachedVisit

);




module.exports=router;