import { QueryFunction } from "@tanstack/react-query";
import type { Recipe } from "../types/recipe";
import { apiFetch } from "../../../shared/api/apiFetch";

const fetchRecipe: QueryFunction<
  Recipe,
  ["searchSingleRecipe", string]
> = async ({ queryKey }) => {
  const query = queryKey[1];
  const res = await apiFetch(
    `https://low-carb-server.onrender.com/api/recipe/${query}`,
    {
      method: "GET",
    }
  );
  if (!res.ok) {
    throw new Error(`pet search is not ok`);
  }

  const jsonResponse = await res.json();

  return jsonResponse?.data?.result;
};

export default fetchRecipe;
