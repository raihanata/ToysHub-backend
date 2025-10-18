import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import dotEnv from 'dotenv'
import authRouter from './routes/authRouter.js';
import testRouter from './routes/testRouter.js';
import categoryRouter from './routes/categoryRouter.js';


const app = express()
app.use(express.json())
const corsOption={
    origin:process.env.FRONTEND_URL
}
app.use(cors(corsOption))
dotEnv.config()


app.get('/',(req,res)=>{
  res.send("api is running")
})

//routes
app.use("/",authRouter)

app.use("/test",testRouter)
app.use("/category",categoryRouter)

//database collections
mongoose.connect(process.env.MONGO_URI).then(()=>{
console.log("database connected");

})







app.listen(8000,()=>{
    console.log("server started at http://localhost:8000")
})