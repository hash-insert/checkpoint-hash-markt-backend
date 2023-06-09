import mongoose from "mongoose"


const ConnectToDB =async()=> {
    try {
       await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to MONGO Cloud")
        
    } catch (error) {
        console.log("error connecting Mongo Cloud")
    }
}

export default ConnectToDB;