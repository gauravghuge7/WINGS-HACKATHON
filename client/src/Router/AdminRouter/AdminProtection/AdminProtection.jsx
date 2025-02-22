
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtection = () => {

      const admin = localStorage.getItem('eventAdmin');

      if(admin === null || admin === undefined || admin === 'false') {
            return (
                  <Navigate to='/' />
            );
      }



      return (
            <Outlet />
      );
}

export default AdminProtection;