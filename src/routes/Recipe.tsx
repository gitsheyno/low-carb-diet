import { useParams } from "react-router-dom";
import styles from "./Recipe.module.css";
import fetchSingleRecipe from "../utils/fetchSingleRecipe";
import { useQuery } from "@tanstack/react-query";
import Steps from "../components/Steps";
import Ingredients from "../components/Ingredients";
export default function Recipe() {
  const { id } = useParams();

  const queryData = useQuery({
    queryKey: [
      "searchSingleRecipe",
      id as string,
      localStorage.getItem("token") as string,
    ],
    queryFn: fetchSingleRecipe,
  });

  const response = queryData?.data;

  return (
    <>
      {response ? (
        <>
          <div className={styles.container}>
            <div className={styles.left}>
              <h1>{response.name}</h1>
              <div className={styles.image}>
                <img src={response.image} alt="" />
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.details}>
                <p className={styles.title}>Details</p>
                <div className={styles.timeDetails}>
                  <p>⏰</p>
                  <div>
                    <p>Cook</p>
                    <p>{response.cookTime} min</p>
                  </div>
                  <div>
                    <p>Prepare</p>
                    <p>{response.prepareTime} min</p>
                  </div>
                </div>
                <div className={styles.nutritionDetails}>
                  <p className={styles.title}>Nutrition per serving</p>
                  <div>
                    <p>Calories</p>
                    <p>🔥 {response.nutrients.caloriesKCal.toFixed()} cal</p>
                  </div>
                  <div>
                    <p>Protein</p>
                    <p>{response.nutrients.protein.toFixed()} g</p>
                  </div>
                  <div>
                    <p>Fats</p>
                    <p>{response.nutrients.fat.toFixed()} g</p>
                  </div>
                  <div>
                    <p>Fiber</p>
                    <p>{response.nutrients.fiber.toFixed()} g</p>
                  </div>
                  <div>
                    <p>Sugar</p>
                    <p>{response.nutrients.sugar.toFixed()} g</p>
                  </div>
                  <div>
                    <p>VitaminA</p>
                    <p>{response.nutrients.vitaminA.toFixed()} g</p>
                  </div>
                  <div>
                    <p>Calcium</p>
                    <p>{response.nutrients.calcium.toFixed()} g</p>
                  </div>
                </div>
                <a href="#">Jump to Recipe</a>
              </div>
            </div>
          </div>
          <Ingredients data={response?.ingredients} />
          <Steps data={response?.steps} />
        </>
      ) : (
        <p> no data</p>
      )}
    </>
  );
}
