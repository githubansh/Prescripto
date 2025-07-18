import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay"

// API to register user
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // checking for all data to register user
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// API to login user
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// API to get user profile data
const getProfile = async (req, res) => {

    try {
        const userId = req.user.userId; 
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// after
const updateProfile = async (req, res) => {
    const userId = req.user.userId;            // ← pull from req.user
    const { name, phone, address, dob, gender } = req.body;
  
    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }
  
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender
    });
  
    if (req.file) {
      const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image"
      });
      await userModel.findByIdAndUpdate(userId, { image: uploadRes.secure_url });
    }
  
    res.json({ success: true, message: 'Profile Updated' });
  }
  

  //Api to book appointement
  const bookAppointment = async (req,res) => {

    try {

        {/*  remember
         req.body   // Data sent by the client (from the frontend)
         req.user   // Data added by middleware (after token verification)
         so userId will be found in req.user.userId , 
         middleware request me sirf user id nhi dalta , wo user object dalta hai and us user object me user id hai 
       */}
        const userId = req.user.userId;
        const { docId,slotDate,slotTime } = req.body

        const docData = await doctorModel.findById(docId).select('-password')

        if(!docData.available){
            return res.json({success:false,message : "Doctor not available"})
        }
        
       

            let slots_booked = docData.slots_booked
            // checking for slots availability 
            if (slots_booked[slotDate]){
                if(slots_booked[slotDate].includes(slotTime)){
                    return res.json({success:false,message : "Doctor not available"})
                } else{

                    slots_booked[slotDate].push(slotTime)

                }
            }
            else{
                slots_booked[slotDate]=[]
                slots_booked[slotDate].push(slotTime)
            }
        

        const userData = await userModel.findById(userId).select('-password')

        // slots_booked deleting from doct data because iske bad appointment data me doc data ko bhi dalege and i dont need ki
        // us doctor ke sare appointments ek single appointmene tme jaye , so delete and later updated slots booked ko add krdena
        delete docData.slots_booked

        const appointmentData={
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date : Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        
        res.json({success:true, message : "Appointment booked"})

    } catch (error) {
        console.log(error)
        res.json({success : false , message : error.message})
        
    }

  }


// api to get user's appointment ( for my-appointment page)
 const listAppointments = async (req, res)=>{

    try {
         const userId = req.user.userId;
         const appointments = await appointmentModel.find({userId}) // after this we will get array with all appointments with this userid
         res.json({success:true , appointments})


    } catch (error) {
        console.log(error)
        res.json({success : false , message : error.message})
    }
 }

//api to cancel appointment of a user
  const cancelAppointment = async (req,res)=>{ 

    try {
        const userId = req.user.userId;
        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        
        //verify appointment user (like koi or user kisi or ka appointment na cancelk krde)
        if (appointmentData.userId !== userId)  {
            return res.json({success : false , message :"unathorized access"})
            
        }
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true}) 

        //adding this this cancelled slot in doctors available time slot
        const {docId,slotDate,slotTime}= appointmentData
        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked
        slots_booked[slotDate]= slots_booked[slotDate].filter(e=> e!==slotTime) //this line removes the cancelled appointment's time slot from the list of booked slots for that dat , It uses .filter() to create a new array with all time slots except the one that matches slotTime
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



//api to make payment using razorpay
const razorpayInstance = new razorpay ({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const paymentRazorpay = async(req,res) =>{

    try {
        const {appointmentId} =req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
    
        if (!appointmentData || appointmentData.cancelled) {
            return res.json({success:false , message :"appointment cancelled or not found"})
            
        }
         // creating options for razorpay payment
         const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }
    
        // creation of an order
        const order = await razorpayInstance.orders.create(options)
    
        res.json({ success: true, order })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            res.json({ success: true, message: "Payment Successful" })
        }
        else {
            res.json({ success: false, message: 'Payment Failed' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    registerUser,loginUser,getProfile,updateProfile, bookAppointment , listAppointments, cancelAppointment,paymentRazorpay,verifyRazorpay
}