const db=require("../config/db");



// save location

const addLocation=async(req,res)=>{


try{


const {

employee_id,

latitude,

longitude

}=req.body;




await db.query(

`INSERT INTO locations

(
employee_id,
latitude,
longitude
)

VALUES (?,?,?)`,


[

employee_id,

latitude,

longitude

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






module.exports={

addLocation,

getLocations

};