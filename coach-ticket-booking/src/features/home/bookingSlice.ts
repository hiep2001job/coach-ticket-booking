import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Define the state type
interface ItemsState {
  items: Item[];
}

// Define the item type
interface Item {
  id: number;
  name: string;
}

// Define the initial state
const initialState: ItemsState = {
  items: [],
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    // Add more reducers as needed
  },
});

export const { addItem, removeItem } = itemsSlice.actions;
export default itemsSlice.reducer;
