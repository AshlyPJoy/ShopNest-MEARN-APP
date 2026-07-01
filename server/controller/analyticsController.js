const User=require('../model/User.js')
const Order=require('../model/Order.js')
const Product=require('../model/Product.js')

const getAdminState=async(req,res)=>{
    try {
const userCount =await User.countDocuments({role:'user'});
const ordercount =await Order.countDocuments({});
const totalProducts =await Product.countDocuments({});
const orders = await Order.find({});
    const totalRevenue = orders.reduce((acc, item) => acc + item.totalAmount, 0);
  res.json({ totalOrders, totalProducts, totalUsers, totalRevenue });
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}

module.exports = { getAdminState };