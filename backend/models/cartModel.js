import mongoose from 'mongoose';

// Cart Item Schema
const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true
    }
});

// Cart Schema
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [cartItemSchema],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    totalItems: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Method to calculate total price and total items
cartSchema.methods.calculateTotals = function() {
    this.totalPrice = this.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    this.totalItems = this.items.reduce((acc, item) => acc + item.quantity, 0);
    return this.save();
};

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;