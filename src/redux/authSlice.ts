import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  loggedIn: boolean;
  authData: AuthData | null;
}

// Check localStorage for initial state
const storedAuthState = localStorage.getItem("authState");
const initialState: AuthState = storedAuthState
  ? JSON.parse(storedAuthState)
  : { loggedIn: false, authData: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.authData = action.payload;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    logout: (state) => {
      state.loggedIn = false;
      state.authData = null;
      localStorage.removeItem("authState");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
