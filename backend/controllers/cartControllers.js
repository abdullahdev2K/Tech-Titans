import asyncHandler from 'express-async-handler';
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

// @desc    Get current user's cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'name price images');

    if (!cart) {
        // Create a new cart if one doesn't exist
        cart = new Cart({
            user: req.user._id,
            items: [],
            totalPrice: 0,
            totalItems: 0,
        });
        await cart.save();
    }

    res.json({
        items: cart.items,
        totalItems: cart.totalItems,
        totalPrice: cart.totalPrice,
    });
});

// @desc Add item to cart
// @route POST /api/cart
// @access Private
const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;

    // Fetch product from DB
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    // Get the user's cart or create a new one
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        cart = new Cart({ user: req.user._id, items: [] });
    }

    // Check if the product is already in the cart
    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (existingItemIndex >= 0) {
        // Directly set the new quantity instead of incrementing
        cart.items[existingItemIndex].quantity = quantity;
    } else {
        // Add the product to the cart
        cart.items.push({
            product: productId,
            quantity,
            price: product.price,
        });
    }

    // Recalculate totals before saving
    await cart.calculateTotals();

    await cart.save();

    res.status(200).json({ message: 'Item added to cart', cart });
});


// @desc    Remove item from cart
// @route   DELETE /api/cart/item/:id
// @access  Private
const removeCartItem = asyncHandler(async (req, res) => {
    const itemId = req.params.id;

    // Find the user's cart
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }

    // Filter out the item from the cart's items array
    const updatedItems = cart.items.filter(item => item._id.toString() !== itemId);

    console.log(cart.items.map(item => item._id.toString()));  // Log all item IDs in the cart

    if (cart.items.length === updatedItems.length) {
        return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items = updatedItems;

    // Recalculate totals and save the cart
    await cart.calculateTotals();
    await cart.save();

    res.status(200).json({ message: 'Item removed from cart', cart });
});

// @desc    Clear cart
// @route   DELETE /api/cart/clear
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }

    // Clear all items and reset totals
    cart.items = [];
    cart.totalPrice = 0;
    cart.totalItems = 0;

    await cart.save();
    res.json({ message: "Cart cleared" });
});


export { getCart, addToCart, removeCartItem, clearCart };