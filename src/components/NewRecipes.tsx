import card from "./Cards.module.css";
import Card from "./Card";
import { Recipe } from "../utils/types";
import container from "../components/HomeContainer.module.css";

export default function NewRecipes({ response }: { response: Recipe[] }) {
  return (
    <div className={container.container}>
      <h3>Cook What's New!</h3>
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
  );
}
