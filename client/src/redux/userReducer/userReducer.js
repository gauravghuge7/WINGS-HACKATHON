
import { createSlice } from '@reduxjs/toolkit'




let localData = undefined;

try {
    // console.log("LocalStorage ",localStorage);
    // console.log(localStorage?.getItem('data'));
    localData = localStorage?.getItem('data') !== undefined ? JSON?.parse(localStorage?.getItem('data') || {} ) : {};
} catch(err) {
    console.log("-->> ",err);
}


const initialState = {

   userData: {
      userId : localData?.userId || '',
      userFirstName: localData?.userFirstName || '',
      userLastName: localData?.userLastName || '',
      userEmail: localData?.userEmail || '',
      userDOB: localData?.userDOB || '',
      userPassword: localData?.userPassword || '',
      userGender: localData?.userGender || '',
      userEvents: [],
      userEnrolledEvents: [],
      userEventCertificates: [],
      isLoggedIn: localStorage?.getItem('isLoggedIn') || false,
   },
   

}


const userSlice = createSlice({
      name: 'user',
      initialState,


      reducers: {
            setUserData: (state, action) => {
                  state.userData = action.payload,
                  state.userData.isLoggedIn = true,
                  localStorage?.setItem('data', JSON?.stringify(action.payload));    
            }
      }
})



export const { setUserData } = userSlice.actions

export default userSlice.reducer