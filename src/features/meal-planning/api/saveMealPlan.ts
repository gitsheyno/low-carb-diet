type Res = string | Meal[];
type Meal = {
  name: string;
  id: string;
  caloriesKCal: number;
  protein: number;
};

const saveMealPlan = async ({
  token,
  meals,
}: {
  token: string;
  meals: Meal[];
}): Promise<Res> => {
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

  if (!res.ok) throw new Error("Unable to save the meal plan");

  return jsonRes?.data?.createdMeals ?? [];
};
export default saveMealPlan;
