import { QueryFunction } from "@tanstack/react-query";
import { apiFetch } from "../../../shared/api/apiFetch";
type Res = {
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
};

const searchMeals: QueryFunction<Res[], ["mealPlanner", string]> = async ({
  queryKey,
}) => {
  const query = queryKey[1];

  if (!query) {
    return [];
  }

  const res = await apiFetch(
    `https://low-carb-server.onrender.com/api/dashboard/planing`,
    {
      method: "POST",
      body: JSON.stringify({ data: query }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) throw new Error("Unable to search meals");

  const jsonRes = await res.json();

  return jsonRes.data.createdMeals;
};

export default searchMeals;
