const mongoose=require('mongoose');


const DB=process.env.DATABASE;

mongoose.connect(DB)
.then(()=>{
    console.log("Connection with database successfull")
})
.catch((error)=>{
    console.log({error:"error in database connection"});
})