import styles from "./Cards.module.css";
import { Link, useSearchParams } from "react-router-dom";
import sty from "../components/Dashboard.module.css";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "../utils/fetchSearch";
import Spinner from "./Spinner";
export default function NewRecipes() {
  const searchParams = useSearchParams();
  const queryData = useQuery({
    queryKey: [
      "search",
      searchParams[0].get("q") as string,
      localStorage.getItem("token") as string,
    ],
    queryFn: fetchSearch,
  });
  console.log("query", searchParams[0].get("q") as string);
  if (queryData.isLoading) {
    return <Spinner />;
  }
  const response = queryData?.data ?? [];
  return (
    <div className={sty.recipesContainer}>
      {response.map((item) => (
        <div key={item.id} className={styles.card}>
          <div className={styles.img}>
            <img src={item.image} alt={item.name} />
            <div className={styles.header}>Today's Featured Recipe</div>
          </div>
          <Link to={`/dashboard/recipe/${item.id}`} className={styles.category}>
            {item.name}
          </Link>
          <div className={styles.infoContainer}>
            <div className={styles.cardInfos}>
              <div>
                <p>Cal</p>
                <p>{item.nutrients.caloriesKCal}</p>
              </div>
              <div>
                <p>Protein</p>
                <p>{item.nutrients.protein}</p>
              </div>
              <div>
                <p>Fats</p>
                <p>{item.nutrients.fat}</p>
              </div>
              <div>
                <p>Carbs</p>
                <p>{item.nutrients.totalCarbs}</p>
              </div>
            </div>
          </div>
          <button className={styles.button}>View Recipe</button>
        </div>
      ))}
    </div>
  );
}
