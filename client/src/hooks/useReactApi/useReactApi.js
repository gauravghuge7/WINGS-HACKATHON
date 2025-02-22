import axios from 'axios';
import { useState } from 'react';
import { extractErrorMessage } from '../customError/CustomError';


const useReactApi = () => {

      const [loading, setLoading] = useState(false);


      const fetchData = async (url) => {
          

            let newData = {};
            let newError = null;
            let success = "";
       
            try {
  
                  const config = {
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                  }
                  
                  setLoading(true);
                  const response = await axios.get(url, config); 
      
                  console.log("response from server", response);
      
                  newData = response.data;
                  success = response?.data?.message;
                  newError = null;
  
  
            } 
            catch (error) {
  
                 const err = error?.response?.data;
                 const message = extractErrorMessage(err)
  
                 newError = message;
                 
            }
            finally {
                 setLoading(false);
            }
  
            return {
                 data: newData,
                 error: newError,
                 success,
            };
            
      };

       //  for send formdata post request to server
     const sendFormData = async (url, formData) => {

          let data = {};
          let error = null;
          let loading = false;
          let success = "";

          try {
           

               const config = {
                    headers: {
                         'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,   
               }


               loading = true;
               const response = await axios.post(url, formData, config); 

               data = response?.data;
               success = response?.data?.message;
               error = null;
               

          } 
          catch (e) {
               
               const err = e?.response?.data;
               console.log("err => ", e);
               const message = extractErrorMessage(err)

               error = message || "unknown error occured while sending data";

          }
          finally {
               loading = false;
          }

          return {
               data,
               error,
               success,
               loading,
          };

     };

      const deleteData = async (url) => {     

            let data = {};
            let error = null;
            let loading = false;     
            let success = "";   
  
       
            try {
                 
                 const config = {
                      headers: {
                           'Content-Type': 'application/json',
                      },
                      withCredentials: true,   
                 }
  
                 loading = true;
                 setLoading(true);
                 const response = await axios.delete(url, config);
  
                 
                 data = response?.data;
                 success = response?.data?.message;
                 error = null;
            }
            catch (e) {
                 
                 const err = e?.response?.data;
                 const message = extractErrorMessage(err)
                 
                 error = message;
            }
            finally {
                 loading = false;    
                 setLoading(false);
            }
  
            return {
                 data,
                 error,
                 success,
                 loading,
            };
  
       }
  
  
       const updateDataUsingPut = async (url, formData) => {     
            let data = {};
            let error = null;
            let loading = false;     
            let success = "";
  
            try {
                 
                 const config = {
                      headers: {
                           'Content-Type': 'application/json',
                      },
                      withCredentials: true,   
                 }
  
                 loading = true;
                 const response = await axios.put(url, formData, config);
  
                 
                 data = response?.data;
                 success = response?.data?.message;
  
            }
            catch (e) {
                 
                 const err = e?.response?.data;
                 console.log("error => ", err);
  
  
                 const message = extractErrorMessage(err)
                 console.log("message => ", message);
                 
                 error = message || err;
            }
            finally {
                 loading = false;    
            }
  
            return {
                 data,
                 error,
                 success,
                 loading,
            };
  
       } 
  
       const updateDataUsingPatch = async (url, formData) => {     
            let data = {};
            let error = null;
            let loading = false;     
            let success = "";
  
            try {
                 
                 const config = {
                      headers: {
                           'Content-Type': 'application/json',
                      },
                      withCredentials: true,   
                 }
  
                 loading = true;
                 setLoading(true);
                 const response = await axios.patch(url, formData, config);
  
                 
                 data = response?.data;
                 success = response?.data?.message;
                 error = null;
            }
            catch (e) {
                 
                 const err = e?.response?.data;
                 const message = extractErrorMessage(err)
                 
                 error = message;
            }
            finally {
                 loading = false;
                 setLoading(false);
            }
  
            return {
                 data,
                 error,
                 success,
                 loading,
            };
  
       }

      return {
            loading, 
            fetchData,
            sendFormData,
            deleteData,
            updateDataUsingPut,
            updateDataUsingPatch
      }
}

export default useReactApi