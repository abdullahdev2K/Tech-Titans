import express from 'express';
import multer from 'multer';
import * as productController from '../controllers/productControllers.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Specify the folder to save files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);  // Add a timestamp to the filename
  }
});

const upload = multer({ storage });

const productRoutes = express.Router();

productRoutes.route('/')
  .get(productController.getProducts);  // Fetch all products (public)

productRoutes.route('/top')
  .get(productController.getTopProducts);  // Get top-rated products

productRoutes.route('/:id')
  .get(productController.getProductById);  // Fetch a single product

// Admin routes
productRoutes.route('/add-new-product')
  .post(protect, admin, upload.array('images'), productController.createProduct);  // Create a product

productRoutes.route('/:id')
  .put(protect, admin, productController.updateProduct)  // Update a product
  .delete(protect, admin, productController.deleteProduct);  // Delete a product

// Private routes
productRoutes.route('/:id/reviews')
  .post(protect, productController.createProductReview);  // Create a new review

export default productRoutes;