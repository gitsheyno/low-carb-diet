import { useState } from "react";
import styles from "../components/Dashboard.module.css";
import { useQuery } from "@tanstack/react-query";
import handleUserMeals from "../utils/handleUserMeals";

import { useDispatch, useSelector } from "react-redux";
import { removeMeal, selectMeals } from "../store/mealPlanningSlice";
export default function UserMeals() {
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const meals = useSelector(selectMeals);
  useQuery({
    queryKey: [
      "handleUserMeals",
      localStorage.getItem("token") as string,
      meals,
      submit,
    ],
    queryFn: handleUserMeals,
  });

  return (
    <div className={styles.listContainer}>
      <ul className={styles.selectedLists}>
        {meals.length > 0 ? (
          <>
            {meals.map((item) => (
              <li key={item.id} className={styles.selectedList}>
                {item.name}
                <span
                  className={styles.icon}
                  onClick={() => dispatch(removeMeal(item.id))}
                >
                  ❌
                </span>
              </li>
            ))}
          </>
        ) : (
          <p>No meal is added</p>
        )}
      </ul>
      <button
        className="bg-blue-500"
        type="button"
        onClick={() => setSubmit(true)}
      >
        Submit
      </button>
    </div>
  );
}
