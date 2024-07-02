import { useState } from "react";
import styles from "../components/Dashboard.module.css";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import handleUserMeals from "../utils/handleUserMeals";

type Meal = {
  name: string;
  id: string;
  caloriesKCal: number;
  protein: number;
};

export default function UserMeals({
  selectedMeal,
  onRemove,
}: {
  selectedMeal: Meal[];
  onRemove: (id: string) => void;
}) {
  const [submit, setSubmit] = useState(false);

  const queryRes = useSuspenseQuery({
    queryKey: [
      "handleUserMeals",
      localStorage.getItem("token") as string,
      selectedMeal,
      submit,
    ],
    queryFn: handleUserMeals,
  });

  const response = queryRes.data ?? [];

  return (
    <div className={styles.listContainer}>
      <ul className={styles.selectedLists}>
        {selectedMeal.length > 0 ? (
          <>
            {selectedMeal.map((item) => (
              <li key={item.id} className={styles.selectedList}>
                {item.name}
                <span className={styles.icon} onClick={() => onRemove(item.id)}>
                  ❌
                </span>
              </li>
            ))}
          </>
        ) : (
          <p>No meal is added</p>
        )}
      </ul>
      <button type="button" onClick={() => setSubmit(true)}>
        Submit
      </button>
    </div>
  );
}
