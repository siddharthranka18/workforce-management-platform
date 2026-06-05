const express=require("express");


const {

getDashboardData

}=require("../controllers/dashboardController");




const router=express.Router();




router.get(

"/:employeeId",

getDashboardData

);





module.exports=router;