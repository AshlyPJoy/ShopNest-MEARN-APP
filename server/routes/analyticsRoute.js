const express =require('express');
const router=express.Router();
const {protect,admin }=require('../middleware/authMiddleware.js')
const {getAdminState}=require('../controller/analyticsController.js')

router.route('/').get(protect,admin,getAdminState);

module.exports = router;

