

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserTemplate from './UserTemplate'
import UserProtection from './UserProtection';





const UserRouter = () => {
      return (
            <Routes>

                  <Route path='/' element={<UserTemplate />}>
                  
                  
                        




                          {/*   Protected Routes by Gaurav Ghuge */}
                        <Route path='user/*' element={<UserProtection />}>
                        


                        </Route>

                  
                  </Route>


                  {/* Not Found Route */}
                  <Route path='*' element={<h1>404 Not Found</h1>} />


            </Routes>
      )
}

export default UserRouter     