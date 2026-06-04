const db=require("../config/db");
const loginEmployee=async(req,res)=>{
try{
const {email}=req.body;
const [employee]=await db.query(
"SELECT * FROM employees WHERE email=?",
[email]
);
if(employee.length===0){
return res.status(404).json({
message:"Employee not found"
});
}
res.json({
message:"Login successful",
employee:employee[0]
});
}
catch(error){
console.log(error);
res.status(500).json({
message:"Server error"
});
}
};
module.exports={
loginEmployee

};