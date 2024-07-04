import styles from "./Dashboard.module.css";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import fetchMeals from "../utils/fetchMeals";
export default function DailyMeals() {
  const query = useQuery({
    queryKey: ["getDailyMeals", localStorage.getItem("token") as string],
    queryFn: fetchMeals,
  });

  const response = query?.data ?? [];

  return (
    <div className={styles.dailyMeals}>
      {response ? (
        <>
          <ul className={styles.dailyMealsLists}>
            {response.map((item) => (
              <li key={item.id}>
                <Link to="#">{item.name}</Link>
                <span>❌</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>no Meals Found</p>
      )}
    </div>
  );
}
