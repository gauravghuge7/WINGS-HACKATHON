
import React from 'react';
import { Route, Routes } from 'react-router-dom';



import LoginProtection from './LoginProtection';
import AdminLoginProtection from './AdminLoginProtection';
import AdminLogin from './../../admin/AdminLogin/AdminLogin';
import AdminSignup from '../../admin/AdminSignup/AdminSignup';
import AdminTemplate from './AdminTemplate';
import AdminDashboard from './../../admin/AdminDashboard/AdminDashboard';
import AdminProtection from './AdminProtection';


const AdminRoute = () => {
   return (
    

      <Routes>

            {/*  extra Protection for the admin */}
            <Route path="/adminCheckout" element={<LoginProtection />} />
            <Route path="/" element={<AdminLoginProtection />}>
                  <Route path="/adminLogin" element={<AdminLogin />} />
                  <Route path="/AdminSignup" element={<AdminSignup />} />
            </Route>




            <Route path='/' element={<AdminProtection />}> 

                  <Route path='/' element={<AdminTemplate />}>


                  <Route index element={ <AdminDashboard />} />
                  {/* <Route path='/dashboard' element={ <AdminDashboard />} />
                  <Route path='/profile' element={<AdminProfile />} />   
                  <Route path='/settings' element={<AdminProfile />} />   
                  <Route path='/faq' element={<AddFaq />} />
                  <Route path='/calendar' element={<AdminCalendar />} />
                  <Route path='/send-notice' element={<UserNotice />} /> */}



                  {/* All User Routes here */}
                  {/* <Route path='/users' element={<AllUsers />} />   
                  <Route path='/block-user' element={<BlockedUsers />} /> */}



                  {/* All Event Routes here */}
                  {/* <Route path='/events' element={<ShowAllEvents />} />   
                  <Route path='/block-events' element={<BlockedEvents />} />   
                  <Route path='/view-event-details/:eventId' element={<ViewEventDetails />} /> */}

                  
                  
                  </Route>

            </Route>

      </Routes>
        
   );
}

export default AdminRoute;
