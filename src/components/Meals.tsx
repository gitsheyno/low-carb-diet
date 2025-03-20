import { Suspense } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import UserMeals from "./UserMeals";
import Spinner from "./Spinner";
import { selectMeals } from "../store/mealPlanningSlice";

const COLORS = ["#3B82F6", "#F59E0B", "#10B981", "#EF4444"];

type Nutrient = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export default function Meals() {
  const meals = useSelector(selectMeals);

  const totals: Nutrient = meals.reduce(
    (accumulator, meal) => {
      accumulator.calories += meal.caloriesKCal || 0;
      accumulator.protein += meal.protein || 0;
      accumulator.carbs += meal.carbs || 0;
      accumulator.fat += meal.fat || 0;
      return accumulator;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const chartData = [
    { name: "Protein", value: totals.protein > 0 ? totals.protein : 0.1 },
    { name: "Carbs", value: totals.carbs > 0 ? totals.carbs : 0.1 },
    { name: "Fat", value: totals.fat > 0 ? totals.fat : 0.1 },
  ];
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex-1 border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-700">Selected Meals</h3>
        </div>
        <div className="max-h-70 overflow-y-auto">
          <Suspense
            fallback={
              <div className="flex justify-center py-4">
                <Spinner />
              </div>
            }
          >
            <UserMeals />
          </Suspense>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Nutritional Summary
        </h3>

        <div className="bg-white rounded-lg p-3 mb-4 border border-gray-200">
          <div className="text-xs text-gray-500">Total Calories</div>
          <div className="text-2xl font-bold text-blue-600">
            {meals.length ? Math.round(totals.calories) : "0"} kcal
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  fill="#8884d8"
                  paddingAngle={4}
                  dataKey="value"
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${Math.round(Number(value))}g`, null]}
                  contentStyle={{
                    borderRadius: "4px",
                    border: "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full md:w-1/2">
            <ul className="space-y-2 px-2">
              {chartData.map((item, index) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between py-1"
                >
                  <div className="flex items-center space-x-2">
                    <span
                      className="w-3 h-3 rounded-full inline-block"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></span>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">
                    {meals.length ? `${Math.round(item.value)}g` : "-"}
                  </span>
                </li>
              ))}
            </ul>

            {meals.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-1">
                  Macro Distribution
                </div>
                <div className="flex h-3 w-full rounded-full overflow-hidden bg-gray-200">
                  {totals.protein + totals.carbs + totals.fat > 0 ? (
                    <>
                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: `${
                            (totals.protein /
                              (totals.protein + totals.carbs + totals.fat)) *
                            100
                          }%`,
                        }}
                      ></div>
                      <div
                        className="h-full bg-yellow-500"
                        style={{
                          width: `${
                            (totals.carbs /
                              (totals.protein + totals.carbs + totals.fat)) *
                            100
                          }%`,
                        }}
                      ></div>
                      <div
                        className="h-full bg-green-500"
                        style={{
                          width: `${
                            (totals.fat /
                              (totals.protein + totals.carbs + totals.fat)) *
                            100
                          }%`,
                        }}
                      ></div>
                    </>
                  ) : (
                    <div className="w-0"></div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
