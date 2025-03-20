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
    return [];
  }

  const res = await fetch(
    `https://low-carb-server.onrender.com/api/dashboard/meals`,
    {
      method: "POST",
      body: JSON.stringify({ data: meals }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );

  const jsonRes = await res.json();

  return jsonRes?.data.createdMeals ?? [];
};
export default handleUserMeals;
