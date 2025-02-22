

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserTemplate from './UserTemplate'
import UserProtection from './UserProtection';

import Landing from '../../home/landing/Landing';





const UserRouter = () => {
      return (
            <Routes>

                  <Route path='/' element={<UserTemplate />}>
                  

                        {/*   Public Routes for landing page */}

                        <Route index element={<Landing />} />






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