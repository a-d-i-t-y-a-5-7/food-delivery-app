import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Redux/Slices/authSlice";
import cartReducer from "./Redux/Slices/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;
