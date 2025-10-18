import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import dotEnv from 'dotenv'
import authRouter from './routes/authRouter.js';
import testRouter from './routes/testRouter.js';
import categoryRouter from './routes/categoryRouter.js';


dotEnv.config()

const app = express()
app.use(express.json())

const corsOption={
    origin:process.env.FRONTEND_URL
    
}

app.use(cors(corsOption))



app.get('/',(req,res)=>{
  res.send("api is running")
})

//routes
app.use("/",authRouter)

app.use("/test",testRouter)
app.use("/category",categoryRouter)

//database collections
mongoose.connect(process.env.MONGO_URI,{
useNewUrlParser:true,
useUnifiedTopology:true
}).then(()=>console.log("Database connnecd"))

.catch((error=>console.log(error)))






const PORT = process.env.PORT || 3000

app.listen(PORT,
    ()=>{
    console.log(`server started at http://localhost:${PORT}`)
})