const express = require("express");
const db =require('./config/db.js')

const  app=express()
app.use(express.json())

db.once("open",()=>{
    console.log('connected')
})

// Routes
const auth = require("./routes/auth");
const products=require('./routes/product.js')
app.use("/api/auth", auth);
app.use("/api",products)


const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port} 🎆`));