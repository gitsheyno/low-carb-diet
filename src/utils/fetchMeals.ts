import { QueryFunction } from "@tanstack/react-query";

export interface Meal {
  belongsToId: string;
  calories: number;
  carbs?: number; // Optional as it's not present in the first example
  carbsCal?: number; // Optional as it's not present in the second example
  carbsGram?: number; // Optional as it's not present in the second example
  createdAT?: string; // Optional as it's not present in the first example
  fat: number;
  fatCal?: number; // Optional as it's not present in the second example
  fatGram?: number; // Optional as it's not present in the second example
  id: string;
  image?: string; // Optional as it's not present in the first example
  name: string;
  protein: number;
  proteinCal?: number; // Optional as it's not present in the second example
  proteinGram?: number; // Optional as it's not present in the second example
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
  meals: Meal[];
}

const fetchMeals: QueryFunction<
  UserMacroData,
  ["getDailyMeals", string]
> = async ({ queryKey }) => {
  const token = queryKey[1];
  //   const query = queryKey[2];

  //   if (!query) {
  //     return [];
  //   }

  const res = await fetch(`http://localhost:3002/api/dashboard/meals`, {
    method: "GET",
    // body: JSON.stringify({ data: query }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const jsonRes = await res.json();

  console.log("mealPlane", jsonRes);

  return jsonRes?.data;
};

export default fetchMeals;
