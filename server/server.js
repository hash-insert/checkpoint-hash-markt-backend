const express = require("express");
const cors = require("cors")
const db =require('./config/db.js')
const cookieParser=require('cookie-parser')

const  app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
db.once("open",()=>{
    console.log('connected')
})

// Routes
const auth = require("./routes/auth");
const products=require('./routes/product.js')
const user = require('./routes/user.js')
app.use("/api/auth", auth);
app.use("/api",products)
app.use("/api/user",user)

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port} 🎆`));