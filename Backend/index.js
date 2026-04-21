import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import chatbotRoutes from './routes/chatbot.routes.js';
import cors from 'cors';

const app = express()
dotenv.config()
const port = process.env.PORT || 3000

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to MongoDB")
})
.catch(err=>console.log("Error connecting to mongoDB",err))
//defining routes
app.use("/bot/v1/", chatbotRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
