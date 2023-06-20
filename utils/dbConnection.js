import mongoose from "mongoose";

let isConnected = false; // tracking the connection status with the DB

export const connectToDB = async () => {
    mongoose.set('strictQuery', true) // setting this mongoose setting for console warning

    if(isConnected) {
        console.log('MongoDb is already connected');
        return
    }

    try {
       await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
       isConnected = true;
       console.log("Succssfully connected to promtopia DB") 
    } catch (error) {
        console.log("Checking Error in connecting to DB", error);
        process.exit(1);
    }
}