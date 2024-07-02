import styles from "../../components/Dashboard.module.css";
import Search from "../../components/Search";
import Meals from "../../components/Meals";
import RenderMeals from "../../components/RenderMeals";
import { Suspense } from "react";
import Spinner from "../../components/Spinner";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
type Meal = {
  name: string;
  id: string;
  caloriesKCal: number;
  protein: number;
};

export default function MealPlanner() {
  const [selectedMeal, setSelectedMeal] = useState<Meal[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const addNewMeal = (item: Meal) => {
    setSelectedMeal((prev) => [...prev, item]);
  };

  const searchParams = useSearchParams();
  const query = searchParams[0].get("q") as string;

  const handleRemove = (id: string) => {
    setSelectedMeal((prev) => {
      const filter = prev.filter((meal) => meal.id !== id);
      return [...filter];
    });
  };

  const totals = selectedMeal.reduce(
    (accumulator, meal) => {
      accumulator.calories += meal.caloriesKCal;
      accumulator.protein += meal.protein;
      return accumulator;
    },
    { calories: 0, protein: 0 }
  );

  return (
    <div className={styles.mealPlaner}>
      <div className={styles.searchContainer}>
        <Search />

        {query && (
          <div className={styles.mealsBox}>
            <ul className={styles.meals}>
              <Suspense fallback={<Spinner />}>
                <RenderMeals handleNewMeal={addNewMeal} />
              </Suspense>
            </ul>
          </div>
        )}
      </div>
      <div className={styles.selectedMealsBox}>
        <Meals
          selectedMeal={selectedMeal}
          total={totals}
          onRemove={handleRemove}
        />
      </div>
    </div>
  );
}
