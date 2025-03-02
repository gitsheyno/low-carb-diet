import { QueryFunction } from "@tanstack/react-query";

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

const fetchMeals: QueryFunction<
  UserMacroData,
  ["getDailyMeals", string]
> = async ({ queryKey }) => {
  const token = queryKey[1];

  const res = await fetch(
    `https://low-carb-server.onrender.com/api/dashboard/meals`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );

  const jsonRes = await res.json();

  return jsonRes?.data;
};

export default fetchMeals;
