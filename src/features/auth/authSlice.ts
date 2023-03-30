import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/user";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthSate {
  isLoggedIn: boolean;
  //dang log hay k
  logging?: boolean;
  currentUser?: User;
}

const initialState: AuthSate = {
  isLoggedIn: false,
  //fix logging
  logging: false,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.logging = false;
      state.currentUser = action.payload;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.isLoggedIn = false;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

//actions
export const authActions = authSlice.actions;

//selectors
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectIsLogging = (state: any) => state.auth.logging;

//reducer
const authReducer = authSlice.reducer;
export default authReducer;
