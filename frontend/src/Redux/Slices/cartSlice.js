import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, imageUrl, availableQuantity, description } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
    
      if (existingItem) {
        existingItem.quantityInCart += 1;
      } else {
        state.items.push({
          id,
          name,
          price,
          imageUrl,
          availableQuantity,
          description, 
          quantityInCart: 1,
        });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantityInCart < item.availableQuantity) {
        item.quantityInCart += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantityInCart > 1) {
        item.quantityInCart -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, clearCart, incrementQuantity, decrementQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
