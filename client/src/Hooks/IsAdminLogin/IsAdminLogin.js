

const isAdminLogin = () => {
   
   const admin = localStorage.getItem("admin");

   if(admin === null) {
      return false;
   }

   return true;
};

export default isAdminLogin;