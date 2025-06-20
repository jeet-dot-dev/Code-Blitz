import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
const app = express();

// middlewares 
app.use(express.json());
app.use(cors());
config();


//main route


// listening func 
app.listen(process.env.PORT,()=>{
  console.log(`Server is running on port ${process.env.PORT}`);
})