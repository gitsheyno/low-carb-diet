import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      if (!state.meals.some((meal) => meal.id === action.payload.id)) {
        state.meals.push(action.payload);
      }
    },
    removeMeal: (state, action: PayloadAction<string>) => {
      state.meals = state.meals.filter((meal) => meal.id !== action.payload);
    },
    resetMeals: (state) => {
      state.meals = [];
    },
  },
});

export const { addMeal, removeMeal, resetMeals } = mealPlanningSlice.actions;

export const selectMeals = (state: { mealPlanning: MealPlanningState }) =>
  state.mealPlanning.meals;

export default mealPlanningSlice.reducer;
