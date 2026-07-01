const Order=require('../model/Order.js');
const sendEmail=require('../utils/sendEmial.js');

const createOrder = async(req,res)=>{
      console.log('Order created:');

const {items,totalAmount,address,paymentId}=req.body;

const userId=req.user._id;

try{
const order= await Order.create({
    userId,
    items,
    totalAmount,
    address,
    paymentId
  })
  res.status(201).json({message:'Order created successfully',order})
  const emailOptions={
    email:req.user.email,
    subject:'Order Confirmation',
    message:`Dear ${req.user.name},\n\nYour order has been confirmed. Thank you for shopping with us!\n\nBest regards,\nThe Shopnest Team`
  };
  await sendEmail(emailOptions);    
}
catch(error){
    res.status(500).json({message:'Failed to create order',error:error.message})
  }

}

const getAllOrders=async(req,res)=>{
    try{
const orders=await Order.find({})
res.status(200).json({message:'Orders fetched successfully',orders})
    }catch(error){
        res.status(500).json({message:'Failed to fetch orders',error:error.message})
    }
}

const updateOrder=async(req,res)=>{
    try{
    const order=await Order.findOne({_id:req.params.id})
    if(!order){
        return res.status(404).json({message:'Order not found'})
    }
    const updatedOrder= await Order.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json({message:'Order updated successfully',updatedOrder})
    }catch(error){
        res.status(500).json({message:'Failed to update order',error:error.message})
    }
}

const getOrderById=async(req,res)=>{
    try{
        const order=await Order.findOne({userId:req.user._id})
        res.status(200).json({message:'Order fetched successfully',order})
    }
    catch(error){
        res.status(500).json({message:'Failed to fetch order',error:error.message})
    }
}



module.exports={createOrder,getAllOrders,updateOrder,getOrderById}