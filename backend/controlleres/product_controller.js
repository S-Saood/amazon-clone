import {instance} from '../index.js'
import crypto from 'crypto'

export const processPayment = async (req, res)=>{

  const options= {    //options object 
    amount: Number(req.body.amount * 100),
    currency: "INR"
  }

  const order = await instance.orders.create(options) //accessing orders from instance then accesssing create method from orders 
  res.status(200).json({
    successfully: true,  //sending responce 
    order
  })
}

export const getKey = async (req, res)=>{
  res.status(200).json({
    key: process.env.RAZORPAY_KEY_ID
  })
}


export const  paymentVarification = async (req, res)=>{
  const {razorpay_payment_id, razorpay_order_id, razorpay_signature}=req.body

  const body = razorpay_order_id  + "|" +  razorpay_payment_id //varification string 
  const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest("hex")
  console.log(`Razorpay signature, ${razorpay_signature}`)
  console.log(`Expected signature, ${expectedSignature}`)

  const isAuthentic = expectedSignature === razorpay_signature;
  if(isAuthentic){
    return res.redirect(`http://localhost:5173/paymentSuccess?reference=${razorpay_payment_id}`)
  } else{
    res.status(400).json({
      success:false
    })
  }

  // console.log(req.body)
  res.status(200).json({
    success:true
  })
}