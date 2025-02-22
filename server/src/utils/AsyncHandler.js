

const asyncHandler = (fn) => (req, res, next) => {

   return Promise
   .resolve(fn(req, res, next))
   .catch((err) => {
      console.log("this is error :", err);
      next(err);
   })

}


export {
   asyncHandler
}