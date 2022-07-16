import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OwnerData {
  name: string;
  email: string;
  phone: string;
  store_name: string;
  location: string;
  store_jobs: string[];
  background: string;
  logo: string;
  description: string;
  minimum_wage: number;
}

export const owner = createSlice({
  name: "owner",
  initialState: {
    name: "",
    email: "",
    phone: "",
    store_name: "",
    location: "",
    store_jobs: [],
    background: "",
    logo: "",
    description: "",
    minimum_wage: 0,
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setStoreName(state, action) {
        state.store_name = action.payload;
      },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPhone(state, action) {
      state.phone = action.payload;
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
    setStorejob(state, action) {
      state.store_jobs.push(action.payload as never);
    },
    setBackground(state, action) {
      state.background = action.payload;
    },
    setLogo(state, action) {
      state.logo = action.payload;
    },
    setMinimumWage(state, action) {
      state.minimum_wage = Number(action.payload);
    },
  },
});

export const { setName, setEmail, setLocation, setPhone,  setStorejob, setBackground, setLogo, setMinimumWage, setStoreName } = owner.actions;
export default owner.reducer;
