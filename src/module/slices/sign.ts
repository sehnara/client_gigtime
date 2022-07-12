import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WorkerSign {
  name: string;
  email: string;
  location: string;
  range: number;
}

export const sign = createSlice({
  name: "sign",
  initialState: {
    name: "",
    email: "",
    location: "",
    range: 0,
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
    setRange(state, action) {
      state.range = action.payload;
    },
  },
});

export const { setName, setEmail, setLocation, setRange } = sign.actions;
export default sign.reducer;
