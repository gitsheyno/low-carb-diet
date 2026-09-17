import { apiFetch } from "../../../shared/api/apiFetch";

type Res = string | Meal[];
type Meal = {
  name: string;
  id: string;
  caloriesKCal: number;
  protein: number;
};

const saveMealPlan = async (meals: Meal[]): Promise<Res> => {
  const res = await apiFetch(
    `https://low-carb-server.onrender.com/api/dashboard/meals`,
    {
      method: "POST",
      body: JSON.stringify({ data: meals }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const jsonRes = await res.json();

  if (!res.ok) throw new Error("Unable to save the meal plan");

  return jsonRes?.data?.createdMeals ?? [];
};
export default saveMealPlan;
