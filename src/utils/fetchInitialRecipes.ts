import { QueryFunction } from "@tanstack/react-query";
import { Recipe } from "./types";

const fetchInitialRecipes: QueryFunction<
  Recipe[],
  ["initialRecipes", string, token: string]
> = async ({ queryKey }) => {
  const api = queryKey[1];
  const token = queryKey[2];

  const res = await fetch(`http://localhost:3002/api/recipes`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!res.ok) {
    throw new Error(`pet search is not ok`);
  }

  const jsonResponse = await res.json();

  return jsonResponse?.data?.filteredRecipe ?? []; // Access the recipe array inside data
};

export default fetchInitialRecipes;