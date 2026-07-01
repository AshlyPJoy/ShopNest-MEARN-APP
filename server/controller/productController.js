const Products = require('../model/Product.js');
const cloudinary = require('../config/cloudinary.js');
const Product = require('../model/Product.js');

const getAllProducts = async (req, res) => {
    try {
        const products = await Products.find({})
        res.status(200).json({ products })
    }
    catch (error) {
        res.status(500).json("server error")
    }

}
const getProductById = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id)
        if (product) {
            res.status(200).json({ product })
        } else {
            res.status(400).json("Product not found")
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        let imageUrl = "";
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }
        const product = await Products.create({
            name, description, price, category, stock, imageUrl
        })
        res.status(201).json("Product created successfully")
    }
    catch (error) {
        res.status(400).json({ error: error.message })

    }
}


const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.stock = stock || product.stock;

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        product.imageUrl = result.secure_url;
      }
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteProduct =async(req,res)=>{
    try{
 const product = await Product.findById(req.params.id);
    if(product){
   await  product.deleteOne()
   res.json("Product removed successfully")

    }else{
        res.json("Product not found")
    }
    }catch(error){
        res.status(400).json({error:error.message})
    }
   
}

module.exports={
    getAllProducts,
    deleteProduct,
    updateProduct,
    createProduct,
    getProductById

}