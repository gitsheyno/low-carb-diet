import { QueryFunction } from "@tanstack/react-query";
import type { Recipe } from "../types/recipe";

const searchRecipes: QueryFunction<
  Recipe[],
  ["search", string, token: string]
> = async ({ queryKey }) => {
  const query = queryKey[1];
  const token = queryKey[2];

  if (!query || query === "") {
    return [];
  }
  const res = await fetch(
    `https://low-carb-server.onrender.com/api/recipes/${query}`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  if (!res.ok) {
    throw new Error(`pet search is not ok`);
  }

  const jsonResponse = await res.json();

  return jsonResponse?.data.response ?? [];
};

export default searchRecipes;
