const express=require("express");


const {

getLeaves,

applyLeave


}=require("../controllers/leaveController");




const router=express.Router();





router.get(

"/:employeeId",

getLeaves

);





router.post(

"/apply",

applyLeave

);






module.exports=router;