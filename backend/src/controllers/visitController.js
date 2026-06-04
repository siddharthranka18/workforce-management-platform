const db=require("../config/db");



// Get visits assigned to employee

const getVisits=async(req,res)=>{


try{


const {employeeId}=req.params;


const [visits]=await db.query(

"SELECT * FROM field_visits WHERE employee_id=?",

[employeeId]

);



res.json(visits);



}

catch(error){


console.log(error);


res.status(500).json({

message:"Server Error"

});


}


};







// Dispatch visit


const dispatchVisit=async(req,res)=>{


try{


const {visitId}=req.params;


const {
latitude,
longitude
}=req.body;



await db.query(

`UPDATE field_visits

SET

status='ON_THE_WAY',

dispatch_lat=?,

dispatch_lng=?,

dispatch_time=NOW()

WHERE id=?`,

[
latitude,
longitude,
visitId
]

);



res.json({

message:"Visit dispatched successfully"

});



}

catch(error){


console.log(error);


res.status(500).json({

message:"Server Error"

});


}



};









// Reached site


const reachedVisit=async(req,res)=>{


try{


const {visitId}=req.params;


const {
latitude,
longitude
}=req.body;



await db.query(

`UPDATE field_visits

SET

status='REACHED',

reached_lat=?,

reached_lng=?,

reached_time=NOW()

WHERE id=?`,

[
latitude,
longitude,
visitId
]

);



res.json({

message:"Site reached successfully"

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

getVisits,

dispatchVisit,

reachedVisit

};