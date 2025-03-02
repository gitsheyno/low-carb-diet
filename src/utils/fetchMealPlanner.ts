import { QueryFunction } from "@tanstack/react-query";
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

const fetchMealPlanner: QueryFunction<
  Res[],
  ["mealPlanner", string, string]
> = async ({ queryKey }) => {
  const token = queryKey[1];
  const query = queryKey[2];

  if (!query) {
    return [];
  }

  const res = await fetch(
    `https://low-carb-server.onrender.com/api/dashboard/planing`,
    {
      method: "POST",
      body: JSON.stringify({ data: query }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );

  const jsonRes = await res.json();

  return jsonRes.data.createdMeals;
};

export default fetchMealPlanner;
