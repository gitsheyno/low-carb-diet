import { QueryFunction } from "@tanstack/react-query";
import { Recipe } from "./types";

const fetchSearch: QueryFunction<
  Recipe[],
  ["search", string, token: string]
> = async ({ queryKey }) => {
  const query = queryKey[1];
  const token = queryKey[2];

  if (!query || query === "") {
    return [];
  }

  const res = await fetch(`http://localhost:3002/api/recipes/${query}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!res.ok) {
    throw new Error(`pet search is not ok`);
  }

  const jsonResponse = await res.json();

  console.log("wha is the data", jsonResponse.data.response);
  return jsonResponse?.data.response ?? []; // Access the recipe array inside data
};

export default fetchSearch;
