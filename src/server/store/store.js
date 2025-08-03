// import { configureStore } from "@reduxjs/toolkit";
// import { api } from "../userApi";

// export const store=configureStore({
//     reducer:{
//         [api.reducerPath]:api.reducer
//     },
//     middleware:(getDefaultMiddleware)=>{
//         getDefaultMiddleware().concat(api.middleware)
//     }
// })

import { configureStore } from "@reduxjs/toolkit";
import { api } from "../userApi";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(api.middleware)
});
