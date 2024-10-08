import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/cart';

// Thunk to fetch cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('authToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get('http://localhost:8080/api/cart', config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


// Thunk to add an item to the cart
export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.post(`${API_URL}/`, { productId, quantity }, config);
        return data; // Return the updated cart data
    } catch (error) {
        return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
    }
});

// Thunk to update the quantity of a cart item
export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('authToken');
        const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        };
        const { data } = await axios.put(`${API_URL}/${itemId}`, { quantity }, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
    }
});

// Thunk to remove an item from the cart
export const removeCartItem = createAsyncThunk('cart/removeCartItem', async (itemId, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        // Update the URL to correctly match the route in the backend
        const { data } = await axios.delete(`${API_URL}/item/${itemId}`, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
    }
});

// Thunk to clear the cart
export const clearCart = createAsyncThunk('cart/clearCart', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('authToken');
        const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        };
        const { data } = await axios.delete(`${API_URL}/clear`, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalItems: 0,
        totalPrice: 0,
        loading: false,
        error: null,
        shippingInfo: {},
    },
    reducers: {
        resetCart: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
        },
        setCart: (state, action) => {
            const { items, totalItems, totalPrice } = action.payload;
            state.items = items;
            state.totalItems = totalItems;
            state.totalPrice = totalPrice;
        },
        saveShippingInfo: (state, action) => {
            state.shippingInfo = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        // Fetch cart
        .addCase(fetchCart.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload.items || [];
            state.totalItems = action.payload.totalItems;
            state.totalPrice = action.payload.totalPrice;
        })
        .addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Add to cart
        .addCase(addToCart.pending, (state) => {
            state.loading = true;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload.items;
            state.totalItems = action.payload.totalItems;
            state.totalPrice = action.payload.totalPrice;
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Update cart item quantity
        .addCase(updateCartItem.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateCartItem.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload.items;
            state.totalItems = action.payload.totalItems;
            state.totalPrice = action.payload.totalPrice;
        })
        .addCase(updateCartItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Remove item from cart
        .addCase(removeCartItem.pending, (state) => {
            state.loading = true;
        })
        .addCase(removeCartItem.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload.items; // updated cart items
            state.totalItems = action.payload.totalItems;
            state.totalPrice = action.payload.totalPrice;
        })        
        .addCase(removeCartItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Clear cart
        .addCase(clearCart.pending, (state) => {
            state.loading = true;
        })
        .addCase(clearCart.fulfilled, (state, action) => {
            state.loading = false;
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
        })
        .addCase(clearCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { resetCart, setCart, saveShippingInfo } = cartSlice.actions;
export default cartSlice.reducer;