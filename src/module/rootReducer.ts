import { combineReducers } from "@reduxjs/toolkit";
import users from "./slices/users";
import sign from "./slices/sign";

const reducer = combineReducers({
  users,
  sign
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
