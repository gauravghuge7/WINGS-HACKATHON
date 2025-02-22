
import mongoose from "mongoose";
import { Admin } from "../../../models/adminModels/admin.model.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../utils/AsyncHandler.js";
import { Event } from "../../../models/eventModels/event.model.js";




const database = mongoose.connection;

database.on("error", console.error.bind(console, "MongoDB connection error:"));



/****  Listening continueousely for new events ****/

const listenForNewEvents = async () => {
     try {
          
          database.once("open", async () => {
          
               const eventStream = Event.watch();
          
               eventStream.on("change", async (event) => {
          
                    if(event.operationType == "insert") {
          
                         const document = event.fullDocument;
          
                         io.emit("event-created", document);
                    }
          
               })
          })
     } 
     catch (error) {
          console.log(error);
     }
}



export {
     listenForNewEvents
}