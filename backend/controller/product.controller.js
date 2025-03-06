import mongoose from "mongoose";
import Product from "../models/product.model.js";


export const getProduct = async(req,res)=>{
    try {
        const products = await Product.find({});
        res.status(201).json({success:true , data:products})
    } catch (error) {
        console.log("Error in fetching product",error.message)
        res.status(500).json({success:false,message:"Server Error"})
    }
} 

export const createProduct = async (req,res)=>{
    const product = req.body // user send this data 

    if( !product.name || !product.price || !product.image){
        return res.status(400).json({success:false , message:"PLease provide all dtails"})
    }

    const newProduct = new Product(product) // "Product" is from models and "product" is our gaiven vaariable in which out detials are present or i can say user give details

    try {
        await newProduct.save()
        res.status(201).json({success:true , data:newProduct})
    } catch (error) {
        console.error("Error in create product:", error.message )
        res.status(500).json({success:false,messege:"Internal server Error"})
    }
}


export const updateProduct = async(req,res)=>{              // PUt=patch

    const {id} =req.params

    const product= req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"ID not available"})
    }

    try {
        const updateProduct = await Product.findByIdAndUpdate(id,product,{new:true})
        res.status(200).json({success:true , data:updateProduct})
    } catch (error) {
        res.status(500).json({success: false ,message:"Server Error"})
    }
}

export const deleteProduct = async(req,res)=>{
    const {id} = req.params;
    console.log("id:",id);

    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({success:true,messege:"product deleted"})
    } catch (error) {
        console.log("Error in deleting Produdct",error.message)
        res.status(404).json({success:false , message:"Product not found"})
    }
}


// we use app.use to enter > product.routes.js then enter > product controller.js to do CRUd operations 