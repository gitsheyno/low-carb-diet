import styles from "../components/Banner.module.css";
import card from "../components/Card.module.css";
import Card from "./Card";
import { Recipe } from "../utils/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
export default function Banner({ data }: { data: Recipe }): JSX.Element {
  console.log(data);
  return (
    <section className={styles.banner}>
      {data ? (
        <>
          <div className={styles.image}>
            <LazyLoadImage src={data.image} />
            {/* <img src={data.image} loading="lazy" /> */}
          </div>
          <Card>
            <div className={card.card}>
              <div className={card.category}>
                <p className={card.category}>{data.tags[0]}</p>
              </div>
              <a href="#">{data.name}</a>
              <div className={card.infoContainer}>
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
            </div>
          </Card>
        </>
      ) : (
        <p> no data</p>
      )}
    </section>
  );
}
