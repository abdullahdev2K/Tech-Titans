import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    
    // Default query for all products
    let query = {};
    
    // If the user is not an admin, only fetch products in stock
    if (!req.user || req.user.role !== 'Admin') {
        query = { countInStock: { $gt: 0 } };
    }

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({
        products,
        page,
        pages: Math.ceil(count / pageSize),
    });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create a product
// @route   POST /api/products/add-new-product
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, specification, category, countInStock, brand, images, isTrending } = req.body;

    console.log(req.body); // Log the request body for debugging

    if (!name || !price || !description || !specification || !category || !countInStock || !brand || !images || !images.length) {
        return res.status(400).json({ message: 'Please fill all the required fields' });
    }

    const product = new Product({
        name,
        price,
        description,
        specification,
        category,
        countInStock,
        brand,
        images, // Assuming images is an array of URLs
        isTrending: isTrending === 'true',
    });

    await product.save();
    res.status(201).json(product);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, description, specification, brand, category, price, countInStock, images, isTrending } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.description = description || product.description;
        product.specification = specification || product.specification;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.price = price || product.price;
        product.countInStock = countInStock || product.countInStock;
        product.images = images && images.length > 0 ? images : product.images;  // Update only if new images are provided
        product.isTrending = isTrending !== undefined ? isTrending : product.isTrending;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne(); // Use deleteOne() instead of remove()
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create a new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        await product.calculateAverageRating();

        await product.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.json(products);
});

// @desc Get latest products
// @route GET /api/products/latest
// @access Public
const getLatestProducts= asyncHandler(async (req,res) => {
    const products = await Product.find({}).sort({ _id: -1 }).limit(3);
    res.json(products);
})

// @desc    Fetch all reviews for a product
// @route   GET /api/products/:id/reviews
// @access  Public
const getProductReviews = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product.reviews);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Get all reviews
// @route   GET /api/products/reviews
// @access  Private/Admin
const getAllReviews = asyncHandler(async (req, res) => {
    const products = await Product.find({}).select('reviews name'); // Fetch only reviews and product names

    const reviews = products.reduce((allReviews, product) => {
        const productReviews = product.reviews.map(review => ({
            ...review._doc, // Include review details
            productName: product.name, // Add product name to each review
            productId: product._id // Add product ID to each review
        }));
        return [...allReviews, ...productReviews];
    }, []);

    res.json(reviews);
});

export { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    createProductReview, 
    getProductReviews,
    getAllReviews,
    getTopProducts,
    getLatestProducts
};