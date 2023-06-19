import mongoose from "mongoose";

mongoose.connect('mongodb+srv://sameeranazneen41:sameera@cluster0.frgydto.mongodb.net/hash-market').then(() => {
    console.log("connected to mongodb");
}).catch((err) => {
    console.log("Error connecting to mongodb")
})