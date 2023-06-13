const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const product = require("./routes/Products.js");
// Routes
const auth = require("./routes/auth");
const MONGO = process.env.MONGO;

app.use(express.json());
app.use(cors());
app.use("/api/auth", auth);
app.use("/api",product);
app.use("/",(req,res)=>{
    res.send('server created sucessfully')
})

const port = process.env.PORT || 8000;
mongoose.connect(`${MONGO}`).then(()=>{console.log('connected to mongodb')}).catch(err=>{console.log(err)})
app.listen(port, () => console.log(`Server running on port ${port} 🎆`));