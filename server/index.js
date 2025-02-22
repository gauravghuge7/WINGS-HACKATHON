// import app from './src/app.js';
import server from './src/socket/socketServer.js';
import connectDB from './src/db/connection/db.config.js';
import dotenv from "dotenv";

dotenv.config({
   path: './.env'
});

// console.log(process.env.MONGODB_URI);


const PORT = 5000;



//  Connecting to the database
connectDB()
.then( () => {

   server.listen(PORT, () => {
      console.log(`app is listening on : ${PORT}
         
            🌐🌐  Here you can access the app
            http://localhost:${PORT}
      `);
   });
})
.catch( (err) => {
   console.log("Error in Express Connection", err);
});


