import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import authSlice from "./authSlice";
import taskSlice from "./taskSlice";
import submissionSlice from "./submissionSlice";


const rootReducer = combineReducers({
  auth: authSlice,
  task: taskSlice,
  submission: submissionSlice
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk)
});

export default store;
