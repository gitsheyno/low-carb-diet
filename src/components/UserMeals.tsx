import { useState } from "react";
import styles from "../components/Dashboard.module.css";
import { useQuery } from "@tanstack/react-query";
import handleUserMeals from "../utils/handleUserMeals";
import { useContext } from "react";
import { MyPlanningContext } from "../store/PlanningContext";

export default function UserMeals() {
  const [submit, setSubmit] = useState(false);
  const { meals, removeMeal } = useContext(MyPlanningContext);

  const queryRes = useQuery({
    queryKey: [
      "handleUserMeals",
      localStorage.getItem("token") as string,
      meals,
      submit,
    ],
    queryFn: handleUserMeals,
  });

  const response = queryRes.data ?? [];

  // if (queryRes.isPending) {
  //   return <Spinner />;
  // }
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
                  onClick={() => removeMeal(item.id)}
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
