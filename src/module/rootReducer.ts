import { combineReducers } from "@reduxjs/toolkit";
import users from "./slices/users";
import sign from "./slices/sign";
import order from "./slices/order";
import store from "./slices/store";
import owner from "./slices/owner";

const reducer = combineReducers({
  users,
  sign,
  order,
  store,
  owner
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
