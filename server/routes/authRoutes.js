const express =require('express');
const router=express.Router();
const {registerUser,loginUser,getUsers,verifyOtp}=require('../controller/authController.js')
const {protect,admin }=require('../middleware/authMiddleware.js')


router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/users',protect,admin,getUsers)
router.post('/verify-otp',verifyOtp);

module.exports = router;

