import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const item = state.items.find(i => i.name === action.payload.name);
      if (item) {
        item.quantity += 1;
        item.total = item.quantity * item.cost;
      } else {
        state.items.push({ ...action.payload, quantity: 1, total: action.payload.cost });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.name !== action.payload.name);
    },
    updateQuantity: (state, action) => {
      const { item, type } = action.payload;
      const cartItem = state.items.find(i => i.name === item.name);
      if (!cartItem) return;

      if (type === "increment") {
        cartItem.quantity += 1;
      } else if (type === "decrement" && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      }
      cartItem.total = cartItem.quantity * cartItem.cost;
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
