
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminTemplate from './../AdminTemplate/AdminTemplate';
import AdminProfile from './../../../Admin/AdminProfile/AdminProfile';
import AllUsers from '../../../Admin/Users/AllUsers';
import ShowAllEvents from '../../../Admin/Events/ShowAllEvents';
import AddFaq from '../../../Admin/FAQ/AddFaq';
import BlockedUsers from '../../../Admin/Users/BlockedUsers';
import BlockedEvents from '../../../Admin/Events/BlockedEvents';
import AdminCalendar from '../../../Admin/AdminCalendar/AdminCalendar';
import UserNotice from '../../../Admin/Notice/UserNotice';
import AdminDashboard from '../../../Admin/AdminDashboard/AdminDashboard';
import AdminProtection from '../AdminProtection/AdminProtection';
import ViewEventDetails from '../../../Admin/Events/ViewEventDetails';


const AdminRoute = () => {
   return (
      <div>

         <Routes>

            <Route path='/' element={<AdminProtection />}> 

               <Route path='/' element={<AdminTemplate />}>


                  <Route index element={ <AdminDashboard />} />
                  <Route path='/dashboard' element={ <AdminDashboard />} />
                  <Route path='/profile' element={<AdminProfile />} />   
                  <Route path='/settings' element={<AdminProfile />} />   
                  <Route path='/faq' element={<AddFaq />} />
                  <Route path='/calendar' element={<AdminCalendar />} />
                  <Route path='/send-notice' element={<UserNotice />} />



                  {/* All User Routes here */}
                  <Route path='/users' element={<AllUsers />} />   
                  <Route path='/block-user' element={<BlockedUsers />} />



                  {/* All Event Routes here */}
                  <Route path='/events' element={<ShowAllEvents />} />   
                  <Route path='/block-events' element={<BlockedEvents />} />   
                  <Route path='/view-event-details/:eventId' element={<ViewEventDetails />} />

                  
                  
               </Route>

            </Route>

         </Routes>
         
      </div>
   );
}

export default AdminRoute;
