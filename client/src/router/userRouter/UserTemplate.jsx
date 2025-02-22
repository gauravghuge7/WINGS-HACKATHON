
import React from 'react'
import { Outlet } from 'react-router-dom'

function UserTemplate() {
  return (
    <div>
      <header>

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