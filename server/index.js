console.log("Node exec args:", process.execArgv);
const express =require('express');
const cors =require('cors');
const dotenv =require('dotenv')
const jwt =require('jsonwebtoken')
const bcrypt=require('bcrypt')
const connectDB=require('./config/db.js')
const authRoutes=require('./routes/authRoutes.js')
const productRoutes=require('./routes/productRoutes.js')
const paymentRoutes=require('./routes/paymentRoutes.js')
const orderRoutes=require('./routes/orderRoute.js')
const analyticsRoutes=require('./routes/analyticsRoute.js')
dotenv.config();
connectDB();

const app =express();
app.use(express.json()); 
const PORT=process.env.PORT||5000;
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', process.env.FRONTEND_URL],
  credentials: true
}));

app.use('/api/auth',authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/payment',paymentRoutes)
app.use('/api/orders',orderRoutes);
app.use('/api/analytics',analyticsRoutes)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})