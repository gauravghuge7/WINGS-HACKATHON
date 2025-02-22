import React from 'react';
import { Outlet } from 'react-router-dom'
import ProfessionalHeader from '../../home/homeNavbar/HomeNavbar';

function UserTemplate() {
  return (
    <div>
      <header>
        <ProfessionalHeader />
      </header>

      <main>
            <Outlet />
      </main>

      <footer>
      
      </footer>

    </div>
  )
}


export default UserTemplate