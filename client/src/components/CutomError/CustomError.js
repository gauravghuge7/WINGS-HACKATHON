


export const extractErrorMessage = (data) => {
     
     const regex = /<pre>(.*?)<\/pre>/g;
     const matches = regex.exec(data);


     if (matches && matches[0]) {
       // Clean the extracted error message

     const error = /<pre>(.*?)<br>/;
     const message = error.exec(data);

     
     if (message && message[1]) {
          return message[1];
     }
     }

     return 'An unknown error occurred.';
}