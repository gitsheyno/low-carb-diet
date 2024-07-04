import { QueryFunction } from "@tanstack/react-query";
type Res = {
  name: string;
  id: string;
  caloriesKCal: number;
  protein: number;
};

const fetchMeals: QueryFunction<Res[], ["getDailyMeals", string]> = async ({
  queryKey,
}) => {
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

  return jsonRes.data.meals ?? [];
};

export default fetchMeals;
