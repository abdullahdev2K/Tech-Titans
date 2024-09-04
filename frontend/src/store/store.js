import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from '../slices/authSlice.js';
import cartReducer from '../slices/cartSlice.js';
import productReducer from '../slices/productSlice';
import orderReducer from '../slices/orderSlice';
import { combineReducers } from 'redux';

// Combine your reducers into one root reducer
const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
    orders: orderReducer
});

// Configuration object for redux-persist
const persistConfig = {
    key: 'root', // Key in local storage
    storage, 
    whitelist: ['auth', 'cart'], // Only persist the auth and cart slices
    blacklist: ['orders'], // Do not persist the orders slice
};

// Persist the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

// Persistor object for redux-persist
const persistor = persistStore(store);

export { store, persistor };