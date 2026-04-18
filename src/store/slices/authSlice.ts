import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: any | null;
  otpSent: boolean;
  otpVerified: boolean;
}

const initialState: AuthState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated: typeof window !== "undefined" ? !!localStorage.getItem("token") : false,
  isLoading: false,
  error: null,
  user: null,
  otpSent: false,
  otpVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = !!token;
      if (token && typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.otpSent = false;
      state.otpVerified = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
    clearError(state) {
      state.error = null;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setOtpSent(state, action) {
      state.otpSent = action.payload;
    },
    setOtpVerified(state, action) {
      state.otpVerified = action.payload;
    },
    resetOtpState(state) {
      state.otpSent = false;
      state.otpVerified = false;
    },
  },
});

export const { 
  logout, 
  clearError, 
  setUser, 
  resetOtpState, 
  setCredentials,
  setOtpSent,
  setOtpVerified
} = authSlice.actions;

export default authSlice.reducer;
