import { QueryFunction } from "@tanstack/react-query";

type Res = string | Meal[];
type Meal = {
  name: string;
  id: string;
  caloriesKCal: number;
  protein: number;
};

const handleUserMeals: QueryFunction<
  Res,
  ["handleUserMeals", string, Meal[], boolean]
> = async ({ queryKey }) => {
  const token = queryKey[1];
  const meals = queryKey[2];
  const submitted = queryKey[3];

  if (!submitted) {
    console.log("submit,", submitted);
    return [];
  }

  const res = await fetch(`http://localhost:3002/api/dashboard/meals`, {
    method: "POST",
    body: JSON.stringify({ data: meals }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const jsonRes = await res.json();

  console.log("mealPlane", jsonRes);

  return jsonRes?.data.createdMeals ?? [];
};
export default handleUserMeals;
