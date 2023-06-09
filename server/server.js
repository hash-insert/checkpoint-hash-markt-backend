import express from "express"
import dotenv from "dotenv"
import ConnectToDB from "./config/DBconn.js";



const app=express();

dotenv.config();
const port= 8080;


ConnectToDB();

app.get("/",(req,res)=> {
 res.send("Hello you created a running server")
})

app.listen(port,()=> {
    console.log(`server is running perefectly`)
})