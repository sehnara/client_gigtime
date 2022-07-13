import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentOrder {
  id : number,
  date : string,
  type : string
}

export const order = createSlice({
  name: "order",
  initialState: {
    id : 0,
    date : "",
    type : ""
  },
  reducers: {
    setCurrentOrder(state, action) {
      state.id = action.payload;
    },
    setCurrentDate(state, action) {
      state.date = action.payload;
    },
    setCurrentType(state, action) {
      state.type = action.payload;
    },
  },
});

export const { setCurrentOrder, setCurrentDate, setCurrentType } = order.actions;
export default order.reducer;
