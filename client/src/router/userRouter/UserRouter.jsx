/* eslint-disable no-unused-vars */


import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserTemplate from './UserTemplate'
import UserProtection from './UserProtection';
import UserLogin from '../../user/Userlogin/Userlogin';
import CreateEvent from '../../user/CreateEvent/CreateEvent';
const NotFound = React.lazy(() => import('../../components/notfound/NotFound'));
const Landing = React.lazy(() => import('../../home/landing/Landing'));
import ContactUs from './../../components/contactus/ContactUs';



const UserRouter = () => {
      return (
            <Routes>

                  <Route path='/' element={<UserTemplate />}>
                  

                        {/*   Public Routes for landing page */}

                        <Route index element={<Landing />} />

                        {/*    user login components */}

                        <Route index element={<Landing />} />
                        <Route path='../' element={<UserLogin />} />
                        <Route path='userlogin' element={<UserLogin />} />
                        <Route path='' element={<CreateEvent />} />
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