import e from "express";
import { ApiError } from "../../utils/ApiError.js";


const emptyFieldValidator = (...fields) => {

   
   console.log("fields => ", fields);

   if(fields?.some(field => field === "" || field === undefined || field === null )) {
      throw new ApiError(400, 'All fields are required');
   }



   return true;
}



export {
   emptyFieldValidator
}