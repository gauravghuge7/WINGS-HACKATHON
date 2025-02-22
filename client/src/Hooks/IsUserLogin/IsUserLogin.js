

const IsUserLogin = () => {
   
   const user = localStorage.getItem("eventUser");

   if(user === null) {
      return false;
   }

   return true;
};

export default IsUserLogin;