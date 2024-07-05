import styles from "./Dashboard.module.css";
import { BarChart, Bar, Tooltip, Cell, Pie, PieChart } from "recharts";
import VisitedRecipes from "./VisitedRecipes";
import DailyMeals from "./DailyMeals";
import { useQuery } from "@tanstack/react-query";
import fetchMeals from "../utils/fetchMeals";

export default function MainPage() {
  const nutrients = [
    { name: "Carbs", value: 50 },
    { name: "Protein", value: 70 },
    { name: "Fat", value: 40 },
    { name: "Vitamins", value: 60 },
    { name: "Vitamin A", value: 40 },
    { name: "Vitamin B", value: 60 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const query = useQuery({
    queryKey: ["getDailyMeals", localStorage.getItem("token") as string],
    queryFn: fetchMeals,
  });

  const response = query?.data;

  const data = [
    { name: "ProteinCal", value: response?.proteinCal },
    { name: "carbsCal", value: response?.carbsCal },
    { name: "fatCal", value: response?.fatCal },
    { name: "required Calories", value: response?.calories },
  ];

  return (
    <main>
      <div className={styles.content}>
        <div className={styles.dashboardSummary}>
          <div className={styles.weekSample}>
            <PieChart width={230} height={210}>
              <Pie
                data={data}
                cx={100}
                cy={100}
                innerRadius={50}
                outerRadius={65}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <ul className={styles.pieChartInfo}>
              {data.map((item, index) => (
                <li key={item.name}>
                  <div>
                    <p
                      style={{
                        backgroundColor: `${COLORS[index]}`,
                      }}
                    ></p>
                    <p
                      style={{
                        color: `${COLORS[index]}`,
                      }}
                    >
                      {item.name}
                    </p>
                  </div>
                  <p
                    style={{
                      color: `${COLORS[index]}`,
                    }}
                  >
                    {Math.round(item.value as number)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          {response ? (
            <>
              <DailyMeals response={response.meals} />
            </>
          ) : (
            <p>no meals added</p>
          )}
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
