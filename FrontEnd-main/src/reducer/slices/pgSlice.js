// import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//   pgInfo: {
//     pgCreateStep: 1,
//     basicDetails: null,
//     roomDetails: null,
//     amenities: null,
//     pgName: "",    // This stores only the name of the selected PG
//     ownerId: null,
//     selectedPG: null,  // Add a property for the selected PG
//     pgDetails: [], 
//     roomChart: [],
//   },
//   loading: false,
//   error: null,
// };

// const pgInfoSlice = createSlice({
//   name: "pgInfo",
//   initialState: initialState,

//   reducers: {
//     setPgCreateStep(state, action) {
//       state.pgInfo.pgCreateStep = action.payload;
//     },
//     submitBasicDetails(state, action) {
//       state.pgInfo.basicDetails = action.payload;
//     },
//     submitRoomDetails(state, action) {
//       state.pgInfo.roomDetails = action.payload;
//     },
//     submitAmenities(state, action) {
//       state.pgInfo.amenities = action.payload;
//     },
//     fetchPGDetailsStart(state) {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchPGDetailsSuccess(state, action) {
//       const pgData = action.payload;
      
//       if (Array.isArray(pgData)) {
//         // If pgData is an array, store all PGs
//         state.pgInfo.pgDetails = pgData;
//         // Set the first PG as selected if none is selected
//         if (!state.pgInfo.selectedPG) {
//           state.pgInfo.selectedPG = pgData[0];
//           state.pgInfo.pgName = pgData[0]?.pgBuilding?.name || 'Unnamed PG';
//           state.pgInfo.ownerId = pgData[0]?.pgBuilding?.ownerId;
//         }
//       } else {
//         // If single PG is passed (for selection)
//         state.pgInfo.selectedPG = pgData;
//         state.pgInfo.pgName = pgData.pgBuilding?.name || 'Unnamed PG';
//         state.pgInfo.ownerId = pgData.pgBuilding?.ownerId;
//       }
      
//       state.loading = false;
//     },
//     fetchPGDetailsFailure(state, action) {
//       state.error = action.payload;
//       state.loading = false;
//     },
//     resetPGInfo(state) {
//       state.pgInfo = initialState.pgInfo;
//       state.loading = false;
//       state.error = null;
//     },
//     fetchRoomChartStart(state) {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchRoomChartSuccess(state, action) {
//       state.pgInfo.roomChart = action.payload;
//       state.loading = false;
//     },
//     fetchRoomChartFailure(state, action) {
//       state.error = action.payload;
//       state.loading = false;
//     }
//   },
// });

// export const {
//   setPgCreateStep,
//   submitBasicDetails,
//   submitRoomDetails,
//   submitAmenities,
//   fetchPGDetailsStart,
//   fetchPGDetailsSuccess,
//   fetchPGDetailsFailure,
//   resetPGInfo,
//   fetchRoomChartStart,
//   fetchRoomChartSuccess,
//   fetchRoomChartFailure,
// } = pgInfoSlice.actions;

// export default pgInfoSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pgInfo: {
    pgCreateStep: 1,
    basicDetails: null,
    roomDetails: null,
    amenities: null,
    pgName: "",
    ownerId: null,
    selectedPG: null,
    pgDetails: [],
    roomChart: [],
    loading: false,
    error: null,
  },
};

const pgInfoSlice = createSlice({
  name: "pgInfo",
  initialState: initialState,

  reducers: {
    setPgCreateStep(state, action) {
      state.pgInfo.pgCreateStep = action.payload;
    },
    submitBasicDetails(state, action) {
      state.pgInfo.basicDetails = action.payload;
    },
    submitRoomDetails(state, action) {
      state.pgInfo.roomDetails = action.payload;
    },
    submitAmenities(state, action) {
      state.pgInfo.amenities = action.payload;
    },
    fetchPGDetailsStart(state) {
      state.pgInfo.loading = true;
      state.pgInfo.error = null;
    },
    fetchPGDetailsSuccess(state, action) {
      const pgData = action.payload;
      
      if (Array.isArray(pgData)) {
        // Store all PGs
        state.pgInfo.pgDetails = pgData;
        
        // Set the first PG as selected if none is selected
        if (!state.pgInfo.selectedPG && pgData.length > 0) {
          state.pgInfo.selectedPG = pgData[0];
          state.pgInfo.pgName = pgData[0]?.pgBuilding?.name || 'Unnamed PG';
          state.pgInfo.ownerId = pgData[0]?.pgBuilding?.ownerId;
        }
      }
      
      state.pgInfo.loading = false;
      state.pgInfo.error = null;
    },
    setSelectedPG(state, action) {
      const pg = action.payload;
      state.pgInfo.selectedPG = pg;
      state.pgInfo.pgName = pg?.pgBuilding?.name || 'Unnamed PG';
      state.pgInfo.ownerId = pg?.pgBuilding?.ownerId;
    },
    fetchPGDetailsFailure(state, action) {
      state.pgInfo.error = action.payload;
      state.pgInfo.loading = false;
    },
    resetPGInfo(state) {
      return initialState;
    },
    fetchRoomChartStart(state) {
      state.pgInfo.loading = true;
      state.pgInfo.error = null;
    },
    fetchRoomChartSuccess(state, action) {
      state.pgInfo.roomChart = action.payload;
      state.pgInfo.loading = false;
    },
    fetchRoomChartFailure(state, action) {
      state.pgInfo.error = action.payload;
      state.pgInfo.loading = false;
    }
  },
});

export const {
  setPgCreateStep,
  submitBasicDetails,
  submitRoomDetails,
  submitAmenities,
  fetchPGDetailsStart,
  fetchPGDetailsSuccess,
  fetchPGDetailsFailure,
  setSelectedPG,
  resetPGInfo,
  fetchRoomChartStart,
  fetchRoomChartSuccess,
  fetchRoomChartFailure,
} = pgInfoSlice.actions;

export default pgInfoSlice.reducer;
