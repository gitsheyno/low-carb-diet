import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import fetchMealPlanner from "../utils/fetchMealPlanner";
import { addMeal } from "../store/mealPlanningSlice";

export default function RenderMeals() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const query = searchParams[0].get("q") as string;

  const queryData = useSuspenseQuery({
    queryKey: ["mealPlanner", localStorage.getItem("token") as string, query],
    queryFn: fetchMealPlanner,
  });

  const meals = queryData?.data ?? [];

  if (meals.length === 0) {
    return (
      <div className="flex justify-center items-center py-8 text-gray-500">
        No meals found for "{query}"
      </div>
    );
  }

  return (
    <>
      {meals.map((meal) => (
        <li
          key={meal.name}
          className="py-3 flex items-center justify-between hover:bg-gray-100 rounded-lg px-2"
        >
          <div className="flex items-center space-x-3">
            {meal.image && (
              <div className="flex-shrink-0 w-12 h-12 overflow-hidden rounded-md">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/48?text=Meal";
                  }}
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <Link
                to={`/dashboard/shayan/recipe/${meal.id}`}
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                {meal.name}
              </Link>
              {meal.description && (
                <p className="text-xs text-gray-500 truncate">
                  {meal.description.substring(0, 60)}
                  {meal.description.length > 60 ? "..." : ""}
                </p>
              )}
              <div className="flex space-x-3 text-xs text-gray-400 mt-1">
                {meal.cookTime && <span>{meal.cookTime} min</span>}
                {meal.caloriesKCal && <span>{meal.caloriesKCal} kcal</span>}
              </div>
            </div>
          </div>

          <button
            onClick={() =>
              dispatch(
                addMeal({
                  id: meal.id,
                  name: meal.name,
                  caloriesKCal: meal.caloriesKCal,
                  protein: meal.protein,
                  carbs: meal.carbs,
                  fat: meal.fat,
                  image: meal.image,
                  description: meal.description,
                  servings: meal.servings,
                  cookTime: meal.cookTime,
                })
              )
            }
            className="ml-2 p-2 text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded-full flex items-center justify-center"
            title="Add to meal plan"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </li>
      ))}
    </>
  );
}
