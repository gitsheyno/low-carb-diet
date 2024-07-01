import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import fetchMealPlanner from "../utils/fetchMealPlanner";
import styles from "../components/Dashboard.module.css";
type Meal = {
  name: string;
  id: string;
  caloriesKCal: number;
  protein: number;
};
export default function RenderMeals({
  handleNewMeal,
}: {
  handleNewMeal: Function;
}) {
  const searchParams = useSearchParams();

  const query = searchParams[0].get("q") as string;
  const queryData = useSuspenseQuery({
    queryKey: ["mealPlanner", localStorage.getItem("token") as string, query],
    queryFn: fetchMealPlanner,
  });

  if (queryData.isLoading) {
    // return <Spinner />;
  }
  const meals = queryData?.data ?? [];

  const handleMeal = (item: Meal) => {
    handleNewMeal(item);
  };
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
                  handleMeal({
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
