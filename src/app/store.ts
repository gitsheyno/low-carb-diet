import { configureStore } from "@reduxjs/toolkit";
import mealPlanningReducer from "../features/meal-planning/state/mealPlanningSlice";

const store = configureStore({
  reducer: {
    mealPlanning: mealPlanningReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
