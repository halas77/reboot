import asyncHandler from "express-async-handler";
import Product from "../models/productSchema.js";
import mongoose from "mongoose";

// Create product
const createProduct = asyncHandler(async (req, res) => {
  const { name, desc, tag, price } = req.body;

  const product = await Product.create({
    name,
    desc,
    tag,
    price,
  });

  if (product) {
    res.status(201).json({
      _id: product._id,
      name: product.name,
      desc: product.desc,
      tag: product.tag,
      price: product.price,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Get all products
const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get product by id
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json({
      _id: product._id,
      name: product.name,
      desc: product.desc,
      price: product.price,
      tag: product.tag,
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Update product
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name || product.name;
    product.desc = req.body.desc || product.desc;
    product.tag = req.body.tag || product.tag;
    product.price = req.body.price || product.price;

    const updatedProduct = await product.save();

    res.json({
      _id: updatedProduct._id,
      name: updatedProduct.name,
      desc: updatedProduct.desc,
      price: updatedProduct.price,
      tag: updatedProduct.tag,
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  const product = await Product.findByIdAndDelete(productId);

  if (product) {
    res.json({
      message: "Product deleted successfully.",
    });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

export { createProduct, updateProduct, getProduct, getProducts, deleteProduct };
