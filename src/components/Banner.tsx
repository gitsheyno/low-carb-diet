import styles from "../components/Banner.module.css";
import card from "../components/Card.module.css";
import Card from "./Card";
import { Recipe } from "../utils/types";

export default function Banner({ data }: { data: Recipe }): JSX.Element {
  return (
    <section className={styles.banner}>
      {data ? (
        <>
          <div className={styles.image}>
            <img src={data.image} />
          </div>
          <Card>
            <div className={card.card}>
              <div className={card.category}>
                <p className={card.category}>{data.category}</p>
              </div>
              <a href="#">{data.name}</a>
              <div className={card.cardInfos}>
                <div>
                  <p>Cal</p>
                  <p>{data.nutrients.caloriesKCal}</p>
                </div>
                <div>
                  <p>Protein</p>
                  <p>{data.nutrients.protein}</p>
                </div>
                <div>
                  <p>Fats</p>
                  <p>{data.nutrients.fat}</p>
                </div>
                <div>
                  <p>Carbs</p>
                  <p>{data.nutrients.totalCarbs}</p>
                </div>
              </div>
            </div>
          </Card>
        </>
      ) : (
        <p> no data</p>
      )}
    </section>
  );
}
