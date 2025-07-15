import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
//app config
const app= express()
const port =process.env.PORT || 4000
connectDB()
connectCloudinary()


//middlewares
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/admin',adminRouter)  // so for //localhost:port/api/admin adminRouter function will be called ie imported already from adminRoute name file



app.get('/',(req,res)=>{
    res.send("lalallalal")
})
app.listen(port, ()=>{console.log("server started" , {port}) })
