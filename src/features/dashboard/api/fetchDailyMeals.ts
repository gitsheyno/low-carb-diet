import { QueryFunction } from "@tanstack/react-query";
import { apiFetch } from "../../../shared/api/apiFetch";

export interface Meal {
  belongsToId: string;
  calories: number;
  carbs: number; // Optional as it's not present in the first example
  createdAT?: string; // Optional as it's not present in the first example
  fat: number;
  id: string;
  image?: string; // Optional as it's not present in the first example
  name: string;
  protein: number;
  description: string;
  servings: number;
  cookTime: number;
}

export interface UserMacroData {
  belongsToId: string;
  calories: number;
  carbsCal: number;
  carbsGram: number;
  fatCal: number;
  fatGram: number;
  id: string;
  name: string;
  proteinCal: number;
  proteinGram: number;
  status: boolean;
  meals: Meal[];
}

const fetchDailyMeals: QueryFunction<
  UserMacroData,
  ["getDailyMeals"]
> = async () => {
  const res = await apiFetch(
    `https://low-carb-server.onrender.com/api/dashboard/meals`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) throw new Error("Unable to load daily meals");

  const jsonRes = await res.json();

  return jsonRes?.data;
};

export default fetchDailyMeals;
