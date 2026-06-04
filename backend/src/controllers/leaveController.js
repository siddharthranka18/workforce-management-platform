const db=require("../config/db");



// get employee leaves

const getLeaves=async(req,res)=>{


try{


const {employeeId}=req.params;


const [leaves]=await db.query(

"SELECT * FROM leaves WHERE employee_id=? ORDER BY created_at DESC",

[employeeId]

);



res.json(leaves);



}


catch(error){


console.log(error);


res.status(500).json({

message:"Server Error"

});


}


};






// apply leave


const applyLeave=async(req,res)=>{


try{


const {

employee_id,

leave_type,

from_date,

to_date,

reason


}=req.body;




await db.query(

`INSERT INTO leaves

(
employee_id,
leave_type,
from_date,
to_date,
reason
)

VALUES (?,?,?,?,?)`,


[

employee_id,

leave_type,

from_date,

to_date,

reason

]

);





res.json({

message:"Leave request submitted"

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

getLeaves,

applyLeave

};