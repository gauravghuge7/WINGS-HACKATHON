import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function UserProtection() {


      const user = localStorage.getItem('eventUser')

      if(user === null || user === undefined ) {
        return <Navigate to='/user/login' />
      }


      return (
            <Outlet />
      )
}

export default UserProtection