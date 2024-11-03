// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./useProfileSlice";
import mealPlanningReducer from "./mealPlanningSlice";

const store = configureStore({
  reducer: {
    profile: profileReducer,
    mealPlanning: mealPlanningReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
