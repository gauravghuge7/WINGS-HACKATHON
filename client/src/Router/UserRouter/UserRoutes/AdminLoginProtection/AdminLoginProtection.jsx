import { Navigate, Outlet } from "react-router-dom";

const AdminLoginProtection = () => {

   const admin = localStorage.getItem("eventAdmin");

   if(admin === null || admin === undefined || admin === false || admin ==="") {
      return <Navigate to={"/"} />;
   }

   return (
      <div>
         <Outlet />
      </div>
   );
}

export default AdminLoginProtection;
