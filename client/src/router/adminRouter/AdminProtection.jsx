
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function AdminProtection() {

      const admin = localStorage.getItem('eventAdmin')
      
      if(admin === null || admin === undefined ) {
            return <Navigate to='/admin/login' />
      }
            
       
      return (
            <Outlet />
      )
            
}

export default AdminProtection