import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products';

// Async thunk to fetch public products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${API_URL}/`);
        return data.products;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk('products/fetchAdminProducts', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${API_URL}/`);
        return data.products;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Async thunk to update products
export const editProduct = createAsyncThunk('product/editProduct', async ({ id, updatedProduct }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.put(`${API_URL}/${id}`, updatedProduct, config);
        return data.success ? true : false;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Async thunk to delete product
export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete(`${API_URL}/${id}`);
        return data.success;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Async thunk to fetch product details
export const fetchProductDetails = createAsyncThunk('product/fetchProductDetails', async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${API_URL}/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Async thunk to add product review
export const addReview = createAsyncThunk('product/addReview', async (reviewData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.post(`${API_URL}/${reviewData.productId}/reviews`, reviewData, config);
        return data.success;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Async thunk to add product
export const addProduct = createAsyncThunk('product/addProduct', async (formData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.post(`${API_URL}/add-new-product`, formData, config);
        return data.product;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Async thunk for fetching reviews
export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async (_, { rejectWithValue, getState }) => {
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };        
        const response = await axios.get(`${API_URL}/reviews`, config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch reviews');
    }
});

// Async thunk to clear errors
export const clearErrors = createAsyncThunk('product/clearErrors', async (_, { dispatch }) => {
    dispatch(clearError());
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        success: false,
        error: null,
        products: [],
        product: {},
        reviews: [],
        isDeleted: false,
        isUpdated: false
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        resetAddProduct: (state) => {
            state.success = false;
        },
        resetDeleteProduct: (state) => {
            state.isDeleted = false;
        },
        resetUpdateProduct: (state) => {
            state.isUpdated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchProductDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload;
            })
            .addCase(addReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.product = action.payload;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.isDeleted = action.payload;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload;
            })            
            .addCase(editProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(clearErrors.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
            state.loading = false;
            state.reviews = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
    }
});

export const { clearError, resetAddProduct, resetDeleteProduct, resetUpdateProduct } = productSlice.actions;

export default productSlice.reducer;