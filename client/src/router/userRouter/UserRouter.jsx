

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserTemplate from './UserTemplate'
import UserProtection from './UserProtection';


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
                        <Route path='contact' element={<ContactUs />} />
                        






                          {/*   Protected Routes by Gaurav Ghuge */}
                        <Route path='user/*' element={<UserProtection />}>
                        


                        </Route>

                  
                  </Route>


                  {/* Not Found Route */}
                  <Route path='*' element={<NotFound />} />


            </Routes>
      )
}

export default UserRouter     