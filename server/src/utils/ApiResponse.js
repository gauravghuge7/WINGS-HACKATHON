

class ApiResponse {

   constructor(
      statusCode = 200,
      message = "success",
      data, 
      success = true
   ) {

      this.success = success;
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
   }

}

export {
   ApiResponse
}