import { QueryFunction } from "@tanstack/react-query";
type Res = {
  name: string;
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

  const res = await fetch(`http://localhost:3002/api/dashboard/planing`, {
    method: "POST",
    body: JSON.stringify({ data: query }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const jsonRes = await res.json();

  console.log("mealPlane", jsonRes);

  return jsonRes.data;
};

export default fetchMealPlanner;
