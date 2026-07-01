const express =require('express');
const router=express.Router();
const {createOrder,getAllOrders,updateOrder,getOrderById}=require('../controller/orderController.js')
const {protect,admin }=require('../middleware/authMiddleware.js')


router.route('/').post(protect,createOrder).get(protect,admin,getAllOrders);
router.route('/:id/status').put(protect,admin,updateOrder)
router.route('/myOrder').get(protect,getOrderById);

module.exports = router;

