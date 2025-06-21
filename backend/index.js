import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import connectDB from './db/db.js';
import userRouter from './routes/userRoute.js';
import { createServer } from "node:http";
import { Server } from "socket.io";
import socketInit from './sockets/index.js';
const app = express();

// middlewares 
app.use(express.json());
app.use(cors());
config();
app.use(express.urlencoded({ extended: true }));

//db call
 connectDB();

 // create HTTP server
 const server = createServer(app);

 // Attach Socket.IO to the http server
 const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
 })

 socketInit(io);

//main route
app.use("/api/v1",userRouter);

// listening func
server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})

export { io }