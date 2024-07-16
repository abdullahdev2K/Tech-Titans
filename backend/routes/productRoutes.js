import express from 'express';
import * as productController from '../controllers/productControllers.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const productRoutes = express.Router();

// Public routes
productRoutes.route('/')
    .get(productController.getProducts)  // Fetch all products

productRoutes.route('/top')
    .get(productController.getTopProducts)  // Get top rated products

productRoutes.route('/:id')
    .get(productController.getProductById)  // Fetch single product

// Admin routes
productRoutes.route('/')
    .post(protect, admin, productController.createProduct)  // Create a product

productRoutes.route('/:id')
    .put(protect, admin, productController.updateProduct)  // Update a product
    .delete(protect, admin, productController.deleteProduct)  // Delete a product

// Private routes
productRoutes.route('/:id/reviews')
    .post(protect, productController.createProductReview)  // Create a new review

export default productRoutes;