import { useSelector } from "react-redux";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { selectMeals } from "../state/mealPlanningSlice";
import SelectedMeals from "./SelectedMeals";

const colors = ["#2f7d55", "#e3b957", "#e87b5a"];

export default function MealPlanSummary() {
  const meals = useSelector(selectMeals);
  const totals = meals.reduce(
    (total, meal) => ({
      calories: total.calories + (meal.caloriesKCal || 0),
      protein: total.protein + (meal.protein || 0),
      carbs: total.carbs + (meal.carbs || 0),
      fat: total.fat + (meal.fat || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
  const chartData = [
    { name: "Protein", value: totals.protein || 0.1 },
    { name: "Carbs", value: totals.carbs || 0.1 },
    { name: "Fat", value: totals.fat || 0.1 },
  ];

  return (
    <div className="grid gap-6">
      <SelectedMeals />
      <div className="rounded-2xl bg-[#f4f4ed] p-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#69766e]">
              Plan total
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-[#18251e]">
              {Math.round(totals.calories)}{" "}
              <span className="text-xs font-semibold text-[#7a857e]">kcal</span>
            </p>
          </div>
          <span className="soft-chip">
            {meals.length} meal{meals.length === 1 ? "" : "s"}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-[110px_1fr] items-center gap-3">
          <div className="h-28">
            <ResponsiveContainer height="100%" width="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  innerRadius={28}
                  outerRadius={48}
                  paddingAngle={4}
                  stroke="transparent"
                >
                  {chartData.map((item, index) => (
                    <Cell fill={colors[index]} key={item.name} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-2">
            {chartData.map((item, index) => (
              <div
                className="flex items-center justify-between text-xs"
                key={item.name}
              >
                <span className="flex items-center gap-2 font-semibold text-[#69766e]">
                  <i
                    className="h-2 w-2 rounded-full"
                    style={{ background: colors[index] }}
                  />
                  {item.name}
                </span>
                <strong>{meals.length ? Math.round(item.value) : 0}g</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
