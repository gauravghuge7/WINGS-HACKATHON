

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminTemplate from './AdminTemplate';
import AdminProtection from './AdminProtection';




const AdminRouter = () => {
      return (
            <Routes>

                  <Route path='/' element={<AdminTemplate />}>
                  

                        {/*   Public Routes for landing page */}


                        {/*   Protected Routes by Gaurav Ghuge */}
                        <Route path='admin/*' element={<AdminProtection />}>
                        


                        </Route>

                  
                  </Route>
             
            </Routes>
      )
}

export default AdminRouter     