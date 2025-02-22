import app from '../app.js';
import { Server } from "socket.io";
import { createServer } from "http";
import redis from "redis";


const server = createServer(app);

export const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
        preflightContinue: true,
    },
});


/***  to store the connected the users to send the notifications to all the users ***/
export const users = new Map();
export const client = redis.createClient();


/***  To Create A Room to when connection established to backend */
io.on("connection", (socket) => {

    console.log("A user connected");
    
    
    socket.on("message", (data) => {
        console.log("Message from user:", data);
        io.emit("chat message", data);
    });


    /***  to connect the user using the custom ID and Event ID only one room  ***/
    socket.on("connectUser", (userId) => {
        console.log("User connected:", userId);
        users.set(socket.id);
        users.set(userId, socket.id);
        client.set(userId, socket.id);
    });

    /***  to disconnect the user using the custom ID and Event ID only one room  ***/
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });


});




export default server;