const express=require("express");

const cors=require("cors");

require("dotenv").config();


const db=require("./config/db");


const app=express();

app.use(cors());

const employeeRoutes=require("./routes/employeeRoutes");
const visitRoutes=require("./routes/visitRoutes");
const leaveRoutes=require("./routes/leaveRoutes");
const locationRoutes=require("./routes/locationRoutes");
const dashboardRoutes=require("./routes/dashboardRoutes");
app.use(express.json());
app.use(

"/api/employees",

employeeRoutes

);
app.use(
"/api/visits",
visitRoutes
);

app.use(
"/api/leaves",
leaveRoutes
);
app.use(
"/api/locations",
locationRoutes
);
app.use(

"/api/dashboard",

dashboardRoutes

);
app.get("/",(req,res)=>{


res.json({

message:"Workforce API Running"

});


});





app.get("/test-db",async(req,res)=>{


try{


const [rows]=await db.query(

"SELECT * FROM employees"

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