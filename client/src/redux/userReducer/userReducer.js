
import { createSlice } from '@reduxjs/toolkit'



const initialState = {
      
      
      user: {
            
      }
}

const userSlice = createSlice({
      name: 'user',
      initialState,


      reducers: {
            setUser: (state, action) => {
                  state.user = action.payload
            },
            setToken: (state, action) => {
                  state.token = action.payload
            },
            setIsAuthenticated: (state, action) => {
                  state.isAuthenticated = action.payload
            },
      }
})



export const { setUser, setToken, setIsAuthenticated } = userSlice.actions

export default userSlice.reducer