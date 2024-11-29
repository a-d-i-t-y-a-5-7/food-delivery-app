import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const decodeToken = () => {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      return { userId: decoded.sub, role: role };
    } catch (error) {
      console.error("Invalid token in sessionStorage:", error);
    }
  }
  return { userId: null, role: null };
};

const { userId, role } = decodeToken();
const initialState = {
  userId,
  role,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      const { userId, role } = decodeToken();
      state.userId = userId;
      state.role = role;
    },
    clearAuth: (state) => {
      state.userId = null;
      state.role = null;
      sessionStorage.removeItem("accessToken");
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
