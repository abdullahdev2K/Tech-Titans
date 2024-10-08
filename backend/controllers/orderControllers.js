import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc    Get all orders (Admin)
// @route   GET /api/admin/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user', 'name email');
    res.json({ success: true, orders });
});

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'name email')
        .populate('orderItems.product', 'name images price'); // Populate product details

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
    const { orderItems, shippingInfo, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingInfo,  // Make sure this matches the frontend
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            isPaid: false
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

// @desc Process order
// @route PUT /api/orders/:id/process
// @access Private/Admin
const processOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    if (!req.body.orderStatus) {
        res.status(400);
        throw new Error('Order status is required');
    }

    order.orderStatus = req.body.orderStatus;

    if (req.body.orderStatus === 'Delivered') {
        order.deliveredAt = Date.now();
    }

    await order.save();

    res.status(200).json({
        success: true,
        message: 'Order status updated successfully',
    });
});

// @desc    Delete order
// @route   DELETE /api/admin/order/:id
// @access  Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        await order.deleteOne();
        res.json({ message: 'Order removed' });
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Get logged in user’s orders
// @route   GET /api/orders/me
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json({ orders });
});

export {createOrder, deleteOrder, getAllOrders, getMyOrders, getOrderById, processOrder};