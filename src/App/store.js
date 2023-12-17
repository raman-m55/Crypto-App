import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { cryptoAPI } from '../services/cryptoApi';

export const store = configureStore({
    reducer : {
        [cryptoAPI.reducerPath] : cryptoAPI.reducer
    } ,


    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(cryptoAPI.middleware)
})


setupListeners(store.dispatch);