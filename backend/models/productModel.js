import mongoose from 'mongoose';

// Schema to store product reviews
const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Schema to store product details
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    specification:{
        type: String,
        required: true,
        trim: true,
    },
    brand: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
    images: [{
        type: String,
        required: true,
    }],
    isTrending: {
        type: Boolean,
        default: false,
    },
    reviews: [reviewSchema],
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    }
}, { timestamps: true });

// Method to calculate the average rating of the product
productSchema.methods.calculateAverageRating = async function() {
    if (this.reviews.length === 0) {
        this.rating = 0;
    } else {
        const totalRating = this.reviews.reduce((acc, review) => acc + review.rating, 0);
        this.rating = totalRating / this.reviews.length;
    }
    this.numReviews = this.reviews.length;
    await this.save();
    return this;
};

// exporting product model
const Product = mongoose.model('Product', productSchema);
export default Product;