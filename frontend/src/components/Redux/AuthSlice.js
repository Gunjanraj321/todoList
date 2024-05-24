import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: localStorage.getItem("token") ? true : false,
    isToken: localStorage.getItem("token") || null ,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuth = action.payload;
    },
    setToken: (state, action) => {
      state.isToken = action.payload;
      localStorage.setItem("token",action.payload);
    },
    clearAuthState: (state) => {
      state.isAuth = false;
      state.isToken = null; 
      localStorage.removeItem("token");
    },
  },
});

export const { setAuthenticated, setToken, clearAuthState } = AuthSlice.actions;
export default AuthSlice.reducer;
