import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import chatbotRoutes from './routes/chatbot.routes.js';
import authRoutes from "./routes/auth.routes.js"
import cors from 'cors';

const app = express();
dotenv.config();

const port = process.env.PORT || 3000

app.use(express.json());
app.use(cors());

app.get("/ping",(req,res)=>{
  res.status(200).json({status:"ok"});
});
//defining routes
app.use("/bot/v1/", chatbotRoutes)
//definig auth routes
app.use("/bot/auth/",authRoutes);
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to MongoDB")
})
.catch(err=>console.log("Error connecting to mongoDB",err))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
