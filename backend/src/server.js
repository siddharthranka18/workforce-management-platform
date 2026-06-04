const express=require("express");

const cors=require("cors");

require("dotenv").config();


const db=require("./config/db");


const app=express();


app.use(cors());

app.use(express.json());



app.get("/",(req,res)=>{


res.json({

message:"Workforce API Running"

});


});





app.get("/test-db",async(req,res)=>{


try{


const [rows]=await db.query(

"SELECT * FROM field_visits"

);


res.json(rows);



}

catch(error){


console.log(error);


res.status(500).json({

message:"Database error"

});


}


});






const PORT=process.env.PORT || 5000;



app.listen(PORT,()=>{


console.log(
`Server running on ${PORT}`
);


});