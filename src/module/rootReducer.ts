import { combineReducers } from "@reduxjs/toolkit";
import users from "./slices/users";
import sign from "./slices/sign";
import order from "./slices/order";
import store from "./slices/store";

const reducer = combineReducers({
  users,
  sign,
  order,
  store
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
