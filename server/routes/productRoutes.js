const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { getAllProducts,
 deleteProduct,
    updateProduct,
    createProduct,
    getProductById } =require('../controller/productController.js')

router.route('/').get(getAllProducts).post(protect, admin, upload.single('image'), createProduct);
router.route('/:id').get(getProductById).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct);




module.exports = router;
