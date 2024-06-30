import styles from "../../components/Dashboard.module.css";
import Search from "../../components/Search";
import Meals from "../../components/Meals";

export default function MealPlanner() {
  return (
    <div className={styles.mealPlaner}>
      <div className={styles.searchContainer}>
        <Search />
        <Meals />
      </div>
    </div>
  );
}
