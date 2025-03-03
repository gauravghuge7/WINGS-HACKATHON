
import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserRoute from './Router/UserRouter/UserRoutes/UserRoute';
import AdminRoute from './Router/AdminRouter/AdminRoutes/AdminRoute';


function App() {

  return (
      <>
        
        <Routes>

            <Route>
 

              {/*  Admin Router Here */}
              <Route path='/admin/*' element={<AdminRoute />} />

              {/*  User Router Here */}
              <Route path='/*' element={<UserRoute />} />


            </Route>

        </Routes>

    </>
  )
}

export default App
