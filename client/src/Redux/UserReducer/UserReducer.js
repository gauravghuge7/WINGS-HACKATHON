import { createSlice } from '@reduxjs/toolkit'



let localData = undefined;

try {
    // console.log("LocalStorage ",localStorage);
    // console.log(localStorage?.getItem('data'));
    localData = localStorage?.getItem('data') !== undefined ? JSON?.parse(localStorage?.getItem('data') || {} ) : {};
} catch(err) {
    console.log("-->> ",err);
}


const intialState = {

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

const userReducer = createSlice({
   name: 'user',
   initialState: intialState,

   reducers: {
      setUserData: (state, action) => {
         state.userData = action.payload,
         state.userData.isLoggedIn = true,
         localStorage?.setItem('data', JSON?.stringify(action.payload));    
      }
   }
})


export const { setUserData} = userReducer.actions;

export default userReducer.reducer;