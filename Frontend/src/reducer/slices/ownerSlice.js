import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  ownerName: "", 
  loading: false,
  error: null,
};

const ownerSlice = createSlice({
  name: 'owner',
  initialState: initialState,

  reducers: {
    fetchOwnerDetailsSuccess(state, action) {
      state.ownerName = action.payload; 
      state.loading = false;
    },
    fetchOwnerDetailsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    resetOwner(state) {
      state.ownerName = "";
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchOwnerDetailsSuccess,
  fetchOwnerDetailsFailure,
  resetOwner,
} = ownerSlice.actions;

export default ownerSlice.reducer;
