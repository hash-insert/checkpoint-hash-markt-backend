const mongoose = require("mongoose");
require("dotenv/config");

let cs = process.env.CONNECTION;

mongoose.connect(cs)
.then(()=>console.log('connected to mongo'))
.catch((error)=>console.log(error));

module.exports= mongoose.connection
