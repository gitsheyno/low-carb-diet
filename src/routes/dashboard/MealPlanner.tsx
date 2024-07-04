import styles from "../../components/Dashboard.module.css";
import Search from "../../components/Search";
import Meals from "../../components/Meals";
import RenderMeals from "../../components/RenderMeals";
import { Suspense } from "react";
import Spinner from "../../components/Spinner";
import { useSearchParams } from "react-router-dom";
import { PlanningProvider } from "../../store/PlanningContext";

export default function MealPlanner() {
  const searchParams = useSearchParams();
  const query = searchParams[0].get("q") as string;

  return (
    <div className={styles.mealPlaner}>
      <PlanningProvider>
        <div className={styles.searchContainer}>
          <Search />

          {query && (
            <div className={styles.mealsBox}>
              <ul className={styles.meals}>
                <Suspense fallback={<Spinner />}>
                  <RenderMeals />
                </Suspense>
              </ul>
            </div>
          )}
        </div>
        <div className={styles.selectedMealsBox}>
          <Meals />
        </div>
      </PlanningProvider>
    </div>
  );
}
