import styles from "../../components/Dashboard.module.css";
import NewRecipes from "../../components/NewRecipes";
import Search from "../../components/Search";
import Spinner from "../../components/Spinner";
import { Suspense } from "react";
export default function Home() {
  return (
    <div className={styles.recipes}>
      <>
        <Search />
        <Suspense fallback={<Spinner />}>
          <NewRecipes />
        </Suspense>
      </>
    </div>
  );
}
