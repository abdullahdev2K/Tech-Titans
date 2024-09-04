import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to add item to cart
export const addItemToCart = createAsyncThunk('cart/addItemToCart', async ({ id, quantity }, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/products/${id}`);
        return {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity,
        };
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Async thunk to remove item from cart
export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart', async (id, { rejectWithValue }) => {
    try {
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Reducer to save shipping info
export const saveShippingInfo = (shippingInfo) => (dispatch) => {
    dispatch(setShippingInfo(shippingInfo));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        shippingInfo: {},
        loading: false,
        error: null,
    },
    reducers: {
        setShippingInfo: (state, action) => {
            state.shippingInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addItemToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.loading = false;
                const item = action.payload;

                const isItemExist = state.cartItems.find(i => i.product === item.product);

                if (isItemExist) {
                    state.cartItems = state.cartItems.map(i =>
                        i.product === isItemExist.product ? item : i
                    );
                } else {
                    state.cartItems.push(item);
                }
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeItemFromCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = state.cartItems.filter(i => i.product !== action.payload);
            })
            .addCase(removeItemFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setShippingInfo } = cartSlice.actions;

export default cartSlice.reducer;