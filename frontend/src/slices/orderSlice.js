import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching all orders
export const fetchAllOrders = createAsyncThunk('order/fetchAllOrders', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/admin/orders');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Async thunk for deleting an order
export const removeOrder = createAsyncThunk('order/removeOrder', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/admin/order/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Async thunk for fetching order details
export const fetchOrderDetails = createAsyncThunk('order/fetchOrderDetails', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/orders/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Async thunk for processing an order
export const processOrder = createAsyncThunk('order/processOrder', async ({ id, formData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/orders/${id}/process`, formData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Async thunk for creating a new order
export const createOrder = createAsyncThunk('order/createOrder', async (order, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/orders', order);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Async thunk for fetching user's orders
export const fetchMyOrders = createAsyncThunk('order/fetchMyOrders', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/orders/me');
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
                state.isUpdated = true;
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