const db=require("../config/db");





const getDashboardData=async(req,res)=>{


try{


const {employeeId}=req.params;





const [locations]=await db.query(

`SELECT COUNT(*) as count

FROM locations

WHERE employee_id=?`,

[employeeId]

);






const [visits]=await db.query(

`SELECT COUNT(*) as count

FROM field_visits

WHERE employee_id=?`,

[employeeId]

);







const [leaves]=await db.query(

`SELECT COUNT(*) as count

FROM leaves

WHERE employee_id=?`,

[employeeId]

);








res.json({


locations:locations[0].count,


visits:visits[0].count,


leaves:leaves[0].count


});





}



catch(error){



console.log(error);



res.status(500).json({

message:"Server Error"

});



}



};







module.exports={

getDashboardData

};