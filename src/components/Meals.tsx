import styles from "../components/Dashboard.module.css";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

type Meal = {
  name: string;
  id: string;
};

type Nut = {
  protein: number;
  calories: number;
};

//TODO add remove handler
export default function Meals({
  selectedMeal,
  total,
  onRemove,
  onSubmit,
}: {
  selectedMeal: Meal[];
  total: Nut;
  onRemove: Function;
  onSubmit: Function;
}) {
  const data = [
    { name: "Group A", value: total.calories },
    { name: "Group B", value: total.protein },
    { name: "Group C", value: 300 },
    // { name: "Group D", value: 200 },
  ];
  return (
    <>
      <div className={styles.listContainer}>
        <ul className={styles.selectedLists}>
          {selectedMeal.length > 0 ? (
            <>
              {selectedMeal.map((item) => (
                <li key={item.id} className={styles.selectedList}>
                  {item.name}
                  <span
                    className={styles.icon}
                    onClick={() => onRemove(item.id)}
                  >
                    ❌
                  </span>
                </li>
              ))}
            </>
          ) : (
            <p>no meal is added</p>
          )}
        </ul>
        <button type="button" onClick={() => onSubmit(selectedMeal)}>
          Submit
        </button>
      </div>
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
