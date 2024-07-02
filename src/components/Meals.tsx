import styles from "../components/Dashboard.module.css";
import { PieChart, Pie, Cell } from "recharts";
import UserMeals from "./UserMeals";
import { Suspense } from "react";
import Spinner from "./Spinner";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

type Meal = {
  name: string;
  id: string;
  caloriesKCal: number;
  protein: number;
};

type Nut = {
  protein: number;
  calories: number;
};

export default function Meals({
  selectedMeal,
  total,
  onRemove,
}: {
  selectedMeal: Meal[];
  total: Nut;
  onRemove: (id: string) => void;
}) {
  const data = [
    { name: "Calories", value: total.calories },
    { name: "Protein", value: total.protein },
    { name: "Other", value: 300 },
  ];

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <UserMeals selectedMeal={selectedMeal} onRemove={onRemove} />
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
            {data.map((entry, index) => (
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
