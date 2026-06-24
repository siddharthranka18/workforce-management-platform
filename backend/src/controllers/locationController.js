const db=require("../config/db");




// save location

const addLocation=async(req,res)=>{


try{


const {

employee_id,

latitude,

longitude,

address,

type

}=req.body;





await db.query(

`INSERT INTO locations

(
employee_id,
latitude,
longitude,
address,
type
)

VALUES (?,?,?,?,?)`,


[

employee_id,

latitude,

longitude,

address,

type || "TRACKING"

]

);




res.json({

message:"Location saved successfully"

});



}


catch(error){


console.log(error);


res.status(500).json({

message:"Server Error"

});


}


};









// get employee locations


const getLocations=async(req,res)=>{


try{


const {employeeId}=req.params;




const [locations]=await db.query(

`SELECT *

FROM locations

WHERE employee_id=?

ORDER BY captured_at DESC`,

[employeeId]

);





res.json(locations);



}


catch(error){


console.log(error);



res.status(500).json({

message:"Server Error"

});



}


};










// check today's attendance status


const getAttendanceStatus=async(req,res)=>{


try{


const {employeeId}=req.params;





const [records]=await db.query(

`SELECT type,captured_at

FROM locations

WHERE employee_id=?

AND DATE(captured_at)=CURDATE()

AND type IN ('CHECK_IN','CHECK_OUT')

ORDER BY captured_at ASC`,

[employeeId]

);






const checkIn =

records.find(

item=>item.type==="CHECK_IN"

);




const checkOut =

records.find(

item=>item.type==="CHECK_OUT"

);







if(checkIn && checkOut){


return res.json({

status:"COMPLETED",

checkIn:checkIn.captured_at,

checkOut:checkOut.captured_at

});


}





if(checkIn){


return res.json({

status:"CHECKED_IN",

checkIn:checkIn.captured_at

});


}





res.json({

status:"NOT_CHECKED_IN"

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

addLocation,

getLocations,

getAttendanceStatus

};