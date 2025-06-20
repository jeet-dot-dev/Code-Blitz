import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import connectDB from './db/db.js';
import userRouter from './routes/userRoute.js';
const app = express();

// middlewares 
app.use(express.json());
app.use(cors());
config();

//db call
 connectDB();


//main route
app.use("/api/v1",userRouter);

// listening func
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})