const User = require('../model/User.js');
const jwt =require('jsonwebtoken')
const bcrypt=require('bcrypt')
const sendEmail=require('../utils/sendEmial.js')
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}
// register user

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exist" })
        }
        // passwod hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // jwt Authentication


        const user = await User.create({ name, email, password: hashedPassword })
        console.log("user",user);
        
        if (user) {

            // sendOtp
            const otp = generateOTP();
            // Send Welcome / OTP Email
            const message = `
        <h2>Welcome to ShopNest, ${name}!</h2>
        <p>Thank you for registering on our platform.</p>
        <p>Your one-time verification/discount OTP is: <strong>${otp}</strong></p>
      `;
      await sendEmail({
                email: user.email,
                subject: 'Welcome to ShopNest - Your OTP',
                message
            });

            res.status(201).json({
                message: "User registered successfully",
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            })
        } else {
            res.status(400).json("Invalid user data")
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message })
        console.log("efyeihf",error.message);
        
    }
}

// Login User

const loginUser =async(req,res)=>{
    const {email, password}=req.body;
    try{
        const user = await User.findOne({email})
       const match = await bcrypt.compare(password,user.password)
              console.log('uuuu',match);

        if(user&& await bcrypt.compare(password,user.password)){
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            })
        }else{
            res.status(400).json("Invalid email or password")
        }
    }catch(error){
        res.status(400).json({error:error.message})
    }
}
// get users
const getUsers =async(req,res)=>{
    try{
        const users = await User.find({})
        res.status(200).json({users}).select('-password')
    }catch(error){
        res.status(400).json({error:error.message})
    }
}
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const validateOtp = await User.findOne({ email,otp });
    if(validateOtp){
        res.status(200).json({message:"Otp verified successfully"})
        const user = await User.findOneAndUpdate({ email }, { isVerified: true }, { new: true });
        await OTP.deleteOne({ _id: validateOtp._id }); // Delete OTP after usage

    }else{
        res.status(400).json({message:"Invalid OTP"})
    }
}
module.exports={
    getUsers,
    loginUser,
    registerUser,
    verifyOtp
}