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
      const newRestaurantId = action.payload;
      if (state.items.length > 0 && state.items[0].restaurantId !== newRestaurantId) {
        state.items = [];
        saveCartToLocalStorage(state.userId, []);
      }

      state.restaurantId = newRestaurantId;
      state.items = state.items.map((item) => ({
        ...item,
        restaurantId: newRestaurantId,
      }));
      saveCartToLocalStorage(state.userId, state.items); 
    },
    addToCart: (state, action) => {
      const { id, name, price, imageUrl, availableQuantity, description, restaurantId } = action.payload;
      
      if (state.restaurantId && state.restaurantId !== restaurantId) {
        state.items = [];
        saveCartToLocalStorage(state.userId, []);
      }

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
          restaurantId: state.restaurantId,
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
