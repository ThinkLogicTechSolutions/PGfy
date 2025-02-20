import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null, // Stores authentication token
  signupData: null, // Stores user signup data
  userId: null, // New state for storing userId
};

const authSlice = createSlice({
  name: "Auth",
  initialState: initialState,

  reducers: {
    // Action to set signup data (for example, when a user signs up)
    setSignupData(state, action) {
      state.signupData = action.payload; // Store signup data
    },
    // Action to set the auth token (for example, after login)
    setToken(state, action) {
      state.token = action.payload; // Store the token
    },
    // Action to set the userId (when user is authenticated)
    setUserId(state, action) {
      state.userId = action.payload; // Store the userId
    },
    // Optionally, action to clear user data (for example, on logout)
    logout(state) {
      state.token = null;
      state.signupData = null;
      state.userId = null;
    },
  },
});

export const { setSignupData, setToken, setUserId, logout } = authSlice.actions;
export default authSlice.reducer;
