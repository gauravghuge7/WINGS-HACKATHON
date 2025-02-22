import React from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import UserRouter from './router/userRouter/UserRouter';

function App() {
  

  return (
    <>

      <Routes>

        <Route>
          
          <Route path='admin/*' element={<h1>Admin</h1>} />


          <Route path='/*' element={ <UserRouter /> } />



        </Route>


      </Routes>


      
    </>
  )
}

export default App
