import styles from "./Dashboard.module.css";
import { Tooltip, Cell, Pie, PieChart } from "recharts";
import DailyMeals from "./DailyMeals";
import { useQuery } from "@tanstack/react-query";
import fetchMeals from "../utils/fetchMeals";
import Spinner from "./Spinner";
import NutritionProgress from "./NutritionProgress";

interface NutritionType {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export default function MainPage() {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const query = useQuery({
    queryKey: ["getDailyMeals", localStorage.getItem("token") as string],
    queryFn: fetchMeals,
  });

  const response = query?.data;

  if (query.isFetching) {
    return <Spinner />;
  }

  const data = [
    { name: "ProteinCal", value: response?.proteinCal },
    { name: "carbsCal", value: response?.carbsCal },
    { name: "fatCal", value: response?.fatCal },
    { name: "required Calories", value: response?.calories },
  ];

  const progressBarData = response?.meals.reduce(
    (accumulator, meal) => {
      accumulator.calories += meal.calories;
      accumulator.protein += meal.protein;
      accumulator.carbs += meal.carbs;
      accumulator.fat += meal.protein;
      return accumulator;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
  console.log(data, "data");
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
                {data.map((_, index) => (
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
          {response && (
            <>
              <DailyMeals response={response.meals} />
            </>
          )}
        </div>
        <div className={styles.nutrientsSummary}>
          <NutritionProgress
            data={progressBarData as NutritionType}
            response={data}
          />
        </div>
      </div>
    </main>
  );
}
