import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {tagsApi} from "./api/tagsApi.ts";

export const store = configureStore({
    reducer: {
        [tagsApi.reducerPath]: tagsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tagsApi.middleware),
})

setupListeners(store.dispatch);