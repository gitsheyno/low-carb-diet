import styles from "../components/Dashboard.module.css";
import Spinner from "./Spinner";
import { Suspense } from "react";
import RenderMeals from "./RenderMeals";

export default function Meals() {
  return (
    <div className={styles.mealsBox}>
      <ul className={styles.meals}>
        <Suspense fallback={<Spinner />}>
          <RenderMeals />
        </Suspense>
      </ul>
    </div>
  );
}
