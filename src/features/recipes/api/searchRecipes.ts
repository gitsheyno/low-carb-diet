import { QueryFunction } from "@tanstack/react-query";
import type { Recipe } from "../types/recipe";
import { apiFetch } from "../../../shared/api/apiFetch";

const searchRecipes: QueryFunction<Recipe[], ["search", string]> = async ({
  queryKey,
}) => {
  const query = queryKey[1];

  if (!query || query === "") {
    return [];
  }
  const res = await apiFetch(
    `https://low-carb-server.onrender.com/api/recipes/${query}`,
    {
      method: "POST",
    }
  );
  if (!res.ok) {
    throw new Error(`pet search is not ok`);
  }

  const jsonResponse = await res.json();

  return jsonResponse?.data.response ?? [];
};

export default searchRecipes;
