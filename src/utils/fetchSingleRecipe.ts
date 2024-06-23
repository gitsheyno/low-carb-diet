import { QueryFunction } from "@tanstack/react-query";
import { Recipe } from "./types";

const fetchSingleRecipe: QueryFunction<
  Recipe,
  ["searchSingleRecipe", string, token: string]
> = async ({ queryKey }) => {
  const query = queryKey[1];
  const token = queryKey[2];
  const res = await fetch(`http://localhost:3002/api/recipe/${query}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!res.ok) {
    throw new Error(`pet search is not ok`);
  }

  const jsonResponse = await res.json();

  console.log("wha is the data", jsonResponse.data);
  return jsonResponse?.data?.result; // Access the recipe array inside data
};

export default fetchSingleRecipe;