import mongoConnection from './src/config/mongoConnection.js';
import app from './src/app.js';
const PORT = process.env.PORT || 5000;

mongoConnection()

.then( () => {

   
  app.listen(PORT, () => {
      console.log(`app is listening on : ${PORT}
         
            🌐🌐  Here you can access the app
            http://localhost:${PORT}
      `);
   });
})
.catch( (err) => {
   console.log("Error in Express Connection", err);
});



