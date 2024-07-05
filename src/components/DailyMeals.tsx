import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import type { Meal, UserMacroData } from "../utils/fetchMeals";

type Res = {
  name: string;
  id: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image: string;
};
export default function DailyMeals({ response }: { response: Meal[] }) {
  return (
    <div className={styles.dailyMeals}>
      {response ? (
        <>
          <ul className={styles.dailyMealsLists}>
            {response.map((item) => (
              <li key={item.id}>
                <div>
                  <img src={item.image} />
                  <Link to="#">{item.name}</Link>
                </div>
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
