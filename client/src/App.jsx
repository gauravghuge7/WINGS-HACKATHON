import React from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import UserRouter from './router/userRouter/UserRouter';
import AdminRouter from './router/adminRouter/AdminRouter';

function App() {
  

  return (
    <>

      <Routes>

        <Route>
          
          <Route path='admin/*' element={<AdminRouter />} />


          <Route path='/*' element={ <UserRouter /> } />



        </Route>


      </Routes>


      
    </>
  )
}

export default App
