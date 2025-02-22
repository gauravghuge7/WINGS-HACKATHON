import {Outlet} from "react-router-dom";


const UserTemplate = () => {
   return (
      <div>
         <header>

         </header>
         <main>
            <Outlet />
         </main>
         <footer></footer>
         
      </div>
   );
}

export default UserTemplate;
