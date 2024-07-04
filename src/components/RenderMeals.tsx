import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import fetchMealPlanner from "../utils/fetchMealPlanner";
import styles from "../components/Dashboard.module.css";
import { MyPlanningContext } from "../store/PlanningContext";
import { useContext } from "react";

export default function RenderMeals() {
  const { addMeal } = useContext(MyPlanningContext);
  const searchParams = useSearchParams();

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
                  addMeal({
                    id: meal.id,
                    name: meal.name,
                    caloriesKCal: meal.caloriesKCal,
                    protein: meal.protein,
                  })
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
