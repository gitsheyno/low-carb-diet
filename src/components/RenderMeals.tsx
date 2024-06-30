import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import fetchMealPlanner from "../utils/fetchMealPlanner";
import styles from "../components/Dashboard.module.css";

export default function RenderMeals() {
  const searchParams = useSearchParams();

  const query = searchParams[0].get("q") as string;
  const queryData = useSuspenseQuery({
    queryKey: ["mealPlanner", localStorage.getItem("token") as string, query],
    queryFn: fetchMealPlanner,
  });

  console.log(queryData.data, "meal rooute");

  if (queryData.isLoading) {
    // return <Spinner />;
  }
  const meals = queryData?.data ?? [];
  return (
    <>
      {meals ? (
        <>
          {meals.map((meal) => (
            <li key={meal.name} className={styles.meal}>
              {meal.name}
            </li>
          ))}
        </>
      ) : (
        <p>no data</p>
      )}
    </>
  );
}
