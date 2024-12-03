import { createSlice } from "@reduxjs/toolkit";

const getCartFromLocalStorage = (userId) => {
  if (!userId) return [];
  const cartData = localStorage.getItem(`cartItems_${userId}`);
  return cartData ? JSON.parse(cartData) : [];
};

const saveCartToLocalStorage = (userId, items) => {
  if (userId) {
    localStorage.setItem(`cartItems_${userId}`, JSON.stringify(items));
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    userId: null,
    restaurantId: null,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
      state.items = getCartFromLocalStorage(action.payload);
    },
    setRestaurantId: (state, action) => {
      state.restaurantId = action.payload;
    },
    addToCart: (state, action) => {
      const { id, name, price, imageUrl, availableQuantity, description } =
        action.payload;
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

      saveCartToLocalStorage(state.userId, state.items);
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantityInCart < item.availableQuantity) {
        item.quantityInCart += 1;
      }
      saveCartToLocalStorage(state.userId, state.items);
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantityInCart > 1) {
        item.quantityInCart -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
      saveCartToLocalStorage(state.userId, state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.userId, []);
    },
  },
});

export const {
  setUserId,
  setRestaurantId,
  addToCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
