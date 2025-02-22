import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../Admin/AdminNavbar/AdminNavbar';
import { useDispatch } from 'react-redux';
import useSendFormData from '../../../Hooks/useSendFormData/useSendFormData';
import { toast, ToastContainer } from 'react-toastify';
import { setEvents } from '../../../Redux/AdminReducer/AdminReducer';

const AdminTemplate = () => {


   const { loading, fetchData } = useSendFormData();
   const navigate = useNavigate();
   const dispatch = useDispatch();
 
   // Fetch events from API
   const fetchEvents = async () => {
     try {
       const { data, error, success } = await fetchData("/api/v1/admin/events/showAllEvents");
 
       if (error) {
         console.log(error);
         toast.error(error);
         return;
       }
 
       toast.success(success);
       dispatch(setEvents(data?.data?.events));
     } 
     catch (error) {
       console.error(error);
       toast.error("Failed to fetch events");
     }
   };
 
   useEffect(() => {
     fetchEvents();
   }, []);



   return (
      <div>
         
         <ToastContainer />

         <header>
            <AdminNavbar />
         </header>

         <main>
            <Outlet />
         </main>
         
         <footer>
            
         </footer>
      </div>
   );
}

export default AdminTemplate;
