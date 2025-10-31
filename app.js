import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import dotEnv from 'dotenv'
import authRouter from './routes/authRouter.js';
import testRouter from './routes/testRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import productRouter from './routes/productRouter.js';
import path from "path"
import customerRouter from './routes/customerRouter.js';
import salesRouter from './routes/salesRouter.js';
import employeeRouter from './routes/employeeRouter.js';
import dashboardRouter from './routes/dashboardRouter.js';

dotEnv.config()

const app = express()
app.use(express.json())

const corsOption={
    origin:process.env.FRONTEND_URL
    
}

app.use(cors(corsOption))

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
  res.send("api is running")
})

//routes
app.use("/",authRouter)

app.use("/test",testRouter)
app.use("/category",categoryRouter)
app.use("/product",productRouter)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/customer",customerRouter)
app.use("/sales",salesRouter)
app.use("/employee",employeeRouter)
app.use("/dashboard",dashboardRouter)
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