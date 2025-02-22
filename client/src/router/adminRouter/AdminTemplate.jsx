

import React from 'react'
import { Outlet } from 'react-router-dom'

function AdminTemplate() {
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

export default AdminTemplate