import { Navigate, Outlet } from "react-router-dom"

const UserProtection = () => {


      const user = localStorage.getItem("eventUser");

      if(user === undefined || user === null || user === "" || user === false){
            return (
                  <Navigate to="/userLogin" />
            )
      }


      return (
            <Outlet />
      )

}

export default UserProtection;