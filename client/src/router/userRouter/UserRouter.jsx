/* eslint-disable no-unused-vars */


import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserTemplate from './UserTemplate'
import UserProtection from './UserProtection';
import UserLogin from '../../user/Userlogin/Userlogin';

const NotFound = React.lazy(() => import('../../components/notfound/NotFound'));
const Landing = React.lazy(() => import('../../home/landing/Landing'));



const UserRouter = () => {
      return (
            <Routes>

                  <Route path='/' element={<UserTemplate />}>
                  

                        {/*   Public Routes for landing page */}

                        <Route index element={<Landing />} />

                        {/*    user login components */}
                        <Route index element={<Landing />} />
                        <Route path='../' element={<UserLogin />} />





                          {/*   Protected Routes by Gaurav Ghuge */}
                        <Route path='../../user/Userlogin/Userlogin*' element={<UserProtection />}>
                        


                        </Route>

                  
                  </Route>


                  {/* Not Found Route */}
                  <Route path='*' element={<NotFound />} />


            </Routes>
      )
}

export default UserRouter     