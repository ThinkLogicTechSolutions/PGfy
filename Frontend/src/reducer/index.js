import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import pgReducer from './slices/pgSlice'
import ownerReducer from './slices/ownerSlice'

const rootReducer = combineReducers({
    Auth:authReducer,
    pgInfo: pgReducer,
    owner: ownerReducer
})

export default rootReducer