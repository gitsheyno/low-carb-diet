import styles from "../components/test.module.css";
import { Recipe } from "../utils/types";
import card from "../components/Dashboard.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import type { Meal, UserMacroData } from "../utils/fetchMeals";

type Res = {
  belongsToId: string;
  calories: number;
  carbs: number; // Optional as it's not present in the first example
  createdAT?: string; // Optional as it's not present in the first example
  fat: number;
  id: string;
  image?: string; // Optional as it's not present in the first example
  name: string;
  protein: number;
  description: string;
  servings: number;
  cookTime: number;
};
export default function Banner({ data }: { data: Res }): JSX.Element {
  console.log(data);
  return (
    <section className={styles.banner}>
      {data ? (
        <>
          <div className={styles.card}>
            <div className={styles.image}>
              <LazyLoadImage src={data.image} alt={data.name} />
              {/* <img src={data.image} loading="lazy" alt={data.name} /> */}
              <div className={styles.header}>Today's Featured Recipe</div>
            </div>
            <div className={styles.category}>{data.name}</div>
            <div className={styles.infoContainer}>
              <div className={styles.cardInfos}>
                <div>
                  <p>20</p>
                  <p>Minutes</p>
                </div>
                <div>
                  <p>5</p>
                  <p>Ingredients</p>
                </div>
                <div>
                  <p>4-6</p>
                  <p>Serving</p>
                </div>
              </div>
              <p className={styles.description}>
                There's no better way to celebrate May being National Strawberry
                Month than by sharing a sweet treat with your pup!
                Strawberries...
              </p>
              <button className={styles.button}>View Recipe</button>
            </div>
          </div>
        </>
      ) : (
        <p> no data</p>
      )}
    </section>
  );
}
