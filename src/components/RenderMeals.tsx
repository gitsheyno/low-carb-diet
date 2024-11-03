import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import fetchMealPlanner from "../utils/fetchMealPlanner";
import styles from "../components/Dashboard.module.css";
import { addMeal } from "../store/mealPlanningSlice";
import { useDispatch } from "react-redux";

export default function RenderMeals() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const query = searchParams[0].get("q") as string;
  const queryData = useSuspenseQuery({
    queryKey: ["mealPlanner", localStorage.getItem("token") as string, query],
    queryFn: fetchMealPlanner,
  });

  const meals = queryData?.data ?? [];

  return (
    <>
      {meals ? (
        <>
          {meals.map((meal) => (
            <li key={meal.name} className={styles.meal}>
              <Link to={`/dashboard/shayan/recipe/${meal.id}`}>
                {meal.name}
              </Link>
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
              >
                ➕
              </button>
            </li>
          ))}
        </>
      ) : (
        <p>no data</p>
      )}
    </>
  );
}
