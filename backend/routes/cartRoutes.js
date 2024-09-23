import express from 'express';
import * as cartControllers from '../controllers/cartControllers.js';

import { protect } from '../middlewares/authMiddleware.js';

const cartRoutes = express.Router();

// @route   GET /api/cart
// @desc    Get all items in the cart
// @access  Private
cartRoutes.route('/')
    .get(protect, cartControllers.getCart)
    .post(protect, cartControllers.addToCart);

// @route   DELETE /api/cart/:id
// @desc    Remove an item from the cart
// @access  Private
cartRoutes.route('/item/:id')
    .delete(protect, cartControllers.removeCartItem)

// @route   DELETE /api/cart/clear
// @desc    Clear the cart
// @access  Private
cartRoutes.route('/clear')
    .delete(protect, cartControllers.clearCart);

export default cartRoutes;