import express from 'express';
import * as orderControllers from '../controllers/orderControllers.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const orderRoutes = express.Router();

// @route   GET /api/admin/orders
// @desc    Get all orders (Admin only)
// @access  Private/Admin
orderRoutes.route('/admin/orders')
    .get(protect, admin, orderControllers.getAllOrders);

// @route   GET /api/orders/me
// @desc    Get current user's orders
// @access  Private
orderRoutes.route('/me')
    .get(protect, orderControllers.getMyOrders);

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
orderRoutes.route('/')
    .post(protect, orderControllers.createOrder);

// @route   GET /api/orders/:id
// @desc    Get single order by ID
// @access  Private
orderRoutes.route('/:id')
    .get(protect, orderControllers.getOrderById);

// @route   PUT /api/orders/:id/process
// @desc    Mark order as processed (delivered)
// @access  Private/Admin
orderRoutes.route('/:id/process')
    .put(protect, admin, orderControllers.processOrder);

// @route   DELETE /api/admin/order/:id
// @desc    Delete an order
// @access  Private/Admin
orderRoutes.route('/admin/order/:id')
    .delete(protect, admin, orderControllers.deleteOrder);

export default orderRoutes;