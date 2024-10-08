import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { clearCart } from './cartSlice.js';

const API_URL = 'http://localhost:8080/api/orders';

// Async thunk for fetching all orders
export const fetchAllOrders = createAsyncThunk('order/fetchAllOrders', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(`${API_URL}/admin/orders`, config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Async thunk for deleting an order
export const removeOrder = createAsyncThunk('order/removeOrder', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${API_URL}/admin/order/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Async thunk for fetching order details
export const fetchOrderDetails = createAsyncThunk('order/fetchOrderDetails', async (id, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(`${API_URL}/${id}`, config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Async thunk for processing an order
export const processOrder = createAsyncThunk('order/processOrder', async ({ id, orderData }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.put(`${API_URL}/${id}/process`, orderData, config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Async thunk for creating a new order
export const createOrder = createAsyncThunk('order/createOrder', async (order, { dispatch, rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/`, order);
        
        // After successfully creating the order, clear the cart
        dispatch(clearCart());

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Async thunk for fetching user's orders
export const fetchMyOrders = createAsyncThunk('order/fetchMyOrders', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(`${API_URL}/me`, config);
        return response.data.orders;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Async thunk for clearing errors
export const clearErrors = () => (dispatch) => {
    dispatch(clearOrderErrors());
};

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        order: {},
        loading: false,
        error: null,
        isDeleted: false,
        isUpdated: false,
        isCreated: false
    },
    reducers: {
        clearOrderErrors: (state) => {
            state.error = null;
        },
        resetDeleteOrder: (state) => {
            state.isDeleted = false;
        },
        resetProcessOrder: (state) => {
            state.isUpdated = false;
        },
        resetCreateOrder: (state) => {
            state.isCreated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isDeleted = false;
            })
            .addCase(removeOrder.fulfilled, (state) => {
                state.loading = false;
                state.isDeleted = true;
            })
            .addCase(removeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchOrderDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(fetchOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(processOrder.pending, (state) => {
                state.loading = true;
                state.isUpdated = false;
                state.error = null;
            })
            .addCase(processOrder.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(processOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.isCreated = false;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state) => {
                state.loading = false;
                state.isCreated = true;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchMyOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchMyOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearOrderErrors, resetDeleteOrder, resetProcessOrder, resetCreateOrder } = orderSlice.actions;

export default orderSlice.reducer;