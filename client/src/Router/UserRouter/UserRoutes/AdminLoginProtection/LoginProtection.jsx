import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // For redirecting to another page after login

const LoginProtection = () => {

  const [username, setUsername] = useState('');
  const navigate = useNavigate();


   const myAdmins = new Set();
   myAdmins.add('pravin');
   myAdmins.add('ganesh');
   myAdmins.add('gaurav');
   myAdmins.add('shubham');
   myAdmins.add('tejas');
   myAdmins.add('prathmesh');

   const handleVarify = async (e) => {
      e.preventDefault();

      if(myAdmins.has(username)) {

         localStorage.setItem("eventAdmin", true);
         navigate('/adminLogin');
      } 

      return false;
   }



   return (
      <div className="login-container max-w-md mx-auto p-4 bg-white rounded-md shadow-lg">
   
         <div>
            <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
            <form onSubmit={handleVarify} className="flex flex-col space-y-4">
               <div>
               <label htmlFor="username" className="block text-gray-700">Username</label>
               <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your username"
                  required
               />
               <label htmlFor="username" className="block text-gray-700">Username</label>
               <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your username"
                  required
               />
               </div>
               <button
               type="submit"
               className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
               >
               Verify
               </button>
            </form>
         </div>
      
      </div>
   );
};

export default LoginProtection;
