import styles from "../components/Dashboard.module.css";
import { PieChart, Pie, Cell } from "recharts";
import UserMeals from "./UserMeals";
import { Suspense } from "react";
import Spinner from "./Spinner";
import { useContext } from "react";
import { MyPlanningContext } from "../store/PlanningContext";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

type Nut = {
  protein: number;
  calories: number;
};

export default function Meals() {
  const { meals } = useContext(MyPlanningContext);

  const totals: Nut = meals.reduce(
    (accumulator, meal) => {
      accumulator.calories += meal.caloriesKCal;
      accumulator.protein += meal.protein;
      return accumulator;
    },
    { calories: 0, protein: 0 }
  );
  const data = [
    { name: "Calories", value: totals.calories },
    { name: "Protein", value: totals.protein },
    { name: "Other", value: 300 },
  ];
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <UserMeals />
      </Suspense>
      <div className={styles.pieChart}>
        <PieChart width={300} height={200}>
          <Pie
            data={data}
            cx={150}
            cy={113}
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
        </PieChart>
      </div>
    </>
  );
}
