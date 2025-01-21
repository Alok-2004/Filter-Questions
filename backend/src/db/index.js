import mongoose from "mongoose";
import{ DB_NAME }from "../constants.js"

const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("Database connected Successfully");     
    }catch(error){
        console.log("Connection Error: " , error);
        throw error;
    }
}

export default connectDB;