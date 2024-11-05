import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface Meal {
  name: string;
  id: string;
  caloriesKCal: number;
  protein: number;
  carbs: number;
  fat: number;
  image: string;
  description: string;
  servings: number;
  cookTime: number;
}

//TODO add a reset action

interface MealPlanningState {
  meals: Meal[];
}

const initialState: MealPlanningState = {
  meals: [],
};

const mealPlanningSlice = createSlice({
  name: "mealPlanning",
  initialState,
  reducers: {
    addMeal: (state, action: PayloadAction<Meal>) => {
      state.meals.push(action.payload);
    },
    removeMeal: (state, action: PayloadAction<string>) => {
      state.meals = state.meals.filter((meal) => meal.id !== action.payload);
    },
  },
});

export const { addMeal, removeMeal } = mealPlanningSlice.actions;

export const selectMeals = (state: RootState) => state.mealPlanning.meals;

export default mealPlanningSlice.reducer;
