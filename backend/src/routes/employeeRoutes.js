const express=require("express");


const {

loginEmployee

}=require("../controllers/employeeController");



const router=express.Router();




router.post(

"/login",

loginEmployee

);




module.exports=router;