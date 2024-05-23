import Banner from "../components/Banner";
import styles from "../components/Protected.module.css";
import Card from "../components/Card";
import card from "../components/Cards.module.css";
import { useQuery } from "@tanstack/react-query";
import fetchInitialRecipes from "../utils/fetchInitialRecipes";
import container from "../components/HomeContainer.module.css";

export default function Protected() {
  const queryData = useQuery({
    queryKey: [
      "initialRecipes",
      "api",
      localStorage.getItem("token") as string,
    ],
    queryFn: fetchInitialRecipes,
  });

  const response = queryData?.data ?? [];
  const banner = response[0];
  console.log(banner, response);
  return (
    <div className={styles.container}>
      <>
        <Banner data={response[0]} />
        <div className={container.container}>
          {response.map((item) => (
            <Card key={item.id}>
              <div className={card.card}>
                <div className={card.img}>
                  <img src={item.image} alt="" />
                </div>
                <a href="#">{item.name}</a>
                <div className={card.cardInfos}>
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
            </Card>
          ))}
        </div>
      </>
    </div>
  );
}
