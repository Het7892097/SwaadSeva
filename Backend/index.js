const express=require("express");
const cors=require("cors");
const {portNo}=require("./utils/KeySettings")
const mainRouter=require("./routes/index")
const app=express();

app.use(cors()); //for BE and FE to interact with each other, for seamless flow of information
app.use(express.json()); //for accessing json content of an request

//base route: api/v1
app.use("/api/v1",(req,res,next)=>{
    console.log("Through main route"); //for getting the flow of user
    next();
},mainRouter);

app.listen(portNo,()=>{
    console.log(`Backend is running on port no: ${portNo}`);
})
