import { ReactNode, createContext, useState } from "react";

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

interface MyContextType {
  meals: Meal[];
  addMeal: (meal: Meal) => void;
  removeMeal: (id: string) => void;
}
export const MyPlanningContext = createContext<MyContextType>({
  meals: [],
  addMeal: () => {},
  removeMeal: () => {},
});

export const PlanningProvider = ({ children }: { children: ReactNode }) => {
  const [meals, setMeals] = useState<Meal[]>([]);

  const addMeal = (meal: Meal) => {
    setMeals((prevMeals) => [...prevMeals, meal]);
  };

  const removeMeal = (id: string) => {
    setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== id));
  };

  return (
    <MyPlanningContext.Provider value={{ meals, addMeal, removeMeal }}>
      {children}
    </MyPlanningContext.Provider>
  );
};
