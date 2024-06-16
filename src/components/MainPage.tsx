import styles from "./Dashboard.module.css";
import { BarChart, Bar, Tooltip } from "recharts";
import VisitedRecipes from "./VisitedRecipes";
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
export default function MainPage() {
  const nutrients = [
    { name: "Carbs", value: 50 },
    { name: "Protein", value: 70 },
    { name: "Fat", value: 40 },
    { name: "Vitamins", value: 60 },
    { name: "Vitamin A", value: 40 },
    { name: "Vitamin B", value: 60 },
  ];
  return (
    <main className={styles.mainPage}>
      <div className={styles.content}>
        <div className={styles.dashboardSummary}>
          <div className={styles.weekSample}>
            <BarChart width={300} height={100} data={data}>
              <Bar dataKey="uv" fill="#8884d8" />
              <Tooltip />
            </BarChart>
          </div>
          <div className={styles.todayCalories}>today</div>
          <VisitedRecipes />
        </div>
        <div className={styles.nutrientsSummary}>
          <div className={styles.nutrientsProgress}>
            <h2>Nutrients Progress</h2>
            {nutrients.map((nutrient) => (
              <div key={nutrient.name} className={styles.progressBar}>
                <label htmlFor={nutrient.name} className={styles.label}>
                  {nutrient.name}
                </label>
                <div className={styles.progressContainer}>
                  <progress
                    id={nutrient.name}
                    value={nutrient.value}
                    max="100"
                    className={styles.progress}
                  ></progress>
                  <span className={styles.progressValue}>
                    {nutrient.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
