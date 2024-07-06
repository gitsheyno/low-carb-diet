import styles from ".//Dashboard.module.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import animation2 from "../../public/animation2.json";

interface NutritionType {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface Limit {
  name: string;
  value: number | undefined;
}

export default function NutritionProgress({
  data,
  response,
}: {
  data: NutritionType;
  response: Limit[];
}) {
  const nutrients = [
    { name: "Protein", value: Math.round(data.protein) },
    { name: "Carbs", value: Math.round(data.carbs) },
    { name: "Fat", value: Math.round(data.fat) },
    { name: "Calories", value: Math.round(data.calories) },
  ];

  return (
    <div className={styles.nutrientsProgress}>
      <div>
        <h2>Nutrients Progress</h2>
        {nutrients.map((nutrient, index) => (
          <div key={nutrient.name} className={styles.progressBar}>
            <label htmlFor={nutrient.name} className={styles.label}>
              {nutrient.name}
            </label>
            <div className={styles.progressContainer}>
              <progress
                id={nutrient.name}
                value={nutrient.value}
                max={response[index].value}
                className={styles.progress}
              ></progress>
              <span className={styles.progressValue}>{nutrient.value}cal</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.lottie}>
        <DotLottieReact
          loop
          autoplay
          src="../../public/animation.lottie"
          width={370}
          height={340}
        />
      </div>
    </div>
  );
}
