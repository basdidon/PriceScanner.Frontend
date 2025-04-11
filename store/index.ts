import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import discountReducer from "./discountSlice";
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        discounts: discountReducer,
    },
});

// Infer types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
