

class ApiError extends Error {

   constructor(
      statusCode = 400,
      message = "something went wrong",
      stack="",
      data=null
   ) {

      super(message);

      this.success = false;
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;

      if(stack) {
         this.stack = stack;
      }
      else {
         Error.captureStackTrace(this, this.constructor);
      }
   }
}

export {
   ApiError
}