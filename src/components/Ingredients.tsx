import { Ingredient } from "../utils/types";
import styles from "../routes/Recipe.module.css";

export default function Ingredients({ data }: { data: Ingredient[] }) {
  return (
    <>
      {data ? (
        <div id="recipe" className={styles.ingredients}>
          <b>Ingredients</b>
          <ul className={styles.ingredientsBox}>
            {data.map((item) => (
              <li key={item.name}>
                <p>{item?.servingSize?.desc} </p>
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>no data</p>
      )}
    </>
  );
}
