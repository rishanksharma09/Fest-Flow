import mongoose from "mongoose";


export const connectDb = async()=>{
    try{
        const db = await mongoose.connect(process.env.MONGODB_URL);
        console.log("database connected ")
    }
    catch(err){
        console.log("database error: ",err)
    }
}