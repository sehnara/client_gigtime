import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Store {
  id: number;
}

export const store = createSlice({
  name: "store",
  initialState: {
    id : 0
  },
  reducers: {
    setStoreId(state, action) {
      state.id = action.payload;
    }
  },
});

export const { setStoreId } = store.actions;
export default store.reducer;
