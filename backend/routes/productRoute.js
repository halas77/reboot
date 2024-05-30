import express from "express";
import {
  createProduct,
  updateProduct,
  getProduct,
  getProducts,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/create").post(protect, createProduct);
router.route("/update/:id").put(protect, updateProduct);
router.route("/products/:id").get(protect, getProduct);
router.route("/products").get(protect, getProducts);
router.route("/delete/:id").delete(protect, deleteProduct);

export default router;
