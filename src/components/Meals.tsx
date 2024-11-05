import styles from "../components/Dashboard.module.css";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import UserMeals from "./UserMeals";
import { Suspense } from "react";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";
import { selectMeals } from "../store/mealPlanningSlice";

const COLORS = ["#0088FE", "#FFBB28"]; // For two categories

type Nut = {
  protein: number;
  calories: number;
};

export default function Meals() {
  const meals = useSelector(selectMeals);

  // Calculate totals
  const totals: Nut = meals.reduce(
    (accumulator, meal) => {
      accumulator.calories += meal.caloriesKCal;
      accumulator.protein += meal.protein;
      return accumulator;
    },
    { calories: 0, protein: 0 } // Start with zero values
  );

  // Use actual data if available, else use placeholder values close to zero
  const data = meals.length
    ? [
        { name: "Calories", value: totals.calories },
        { name: "Protein", value: totals.protein },
      ]
    : [
        { name: "Calories", value: 0.1 },
        { name: "Protein", value: 0.1 },
      ];

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <UserMeals />
      </Suspense>
      <div className={styles.pieChartContainer}>
        <PieChart width={300} height={200}>
          <Pie
            data={data}
            cx={150}
            cy={100}
            innerRadius={60}
            outerRadius={80}
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
            <li key={item.name} className={styles.pieChartLegend}>
              <div>
                <span
                  className={styles.legendColorBox}
                  style={{ backgroundColor: COLORS[index] }}
                ></span>
                <span style={{ color: COLORS[index] }}>{item.name}</span>
              </div>
              <span style={{ color: COLORS[index] }}>
                {meals.length ? Math.round(item.value) : "-"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
