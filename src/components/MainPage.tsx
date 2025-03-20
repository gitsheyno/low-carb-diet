import { Tooltip, Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import fetchMeals from "../utils/fetchMeals";
import Spinner from "./Spinner";
import DailyMeals from "./DailyMeals";
import NutritionProgress from "./NutritionProgress";
import { Link, useParams } from "react-router-dom";

interface NutritionType {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export default function MainPage() {
  const COLORS = ["#4F46E5", "#16A34A", "#F59E0B", "#EF4444"];
  const { user } = useParams();

  const query = useQuery({
    queryKey: ["getDailyMeals", localStorage.getItem("token") as string],
    queryFn: fetchMeals,
  });

  const response = query?.data;

  if (query.isFetching) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Spinner />
      </div>
    );
  }

  const data = [
    { name: "Protein", value: response?.proteinCal },
    { name: "Carbs", value: response?.carbsCal },
    { name: "Fat", value: response?.fatCal },
    { name: "Required", value: response?.calories },
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

  const totalCalories = progressBarData?.calories || 0;
  const calorieGoal = response?.calories || 2000;
  const caloriePercentage = Math.min(
    100,
    Math.round((totalCalories / calorieGoal) * 100)
  );

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Nutrition Dashboard
        </h1>
        <p className="text-gray-600">
          Track your daily nutrition goals and meals
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Daily Calories</p>
              <p className="text-xl font-bold">
                {Math.round(totalCalories)} / {calorieGoal}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${caloriePercentage}%` }}
            ></div>
          </div>
          <p className="text-right text-xs text-gray-500 mt-1">
            {caloriePercentage}% of goal
          </p>
        </div>

        {data.slice(0, 3).map((item, index) => (
          <div
            key={item.name}
            className={`bg-white rounded-xl shadow-sm p-4 border-l-4`}
            style={{ borderColor: COLORS[index] }}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{item.name}</p>
                <p className="text-xl font-bold">
                  {Math.round(item.value as number)} cal
                </p>
              </div>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${COLORS[index]}20` }}
              >
                <span className="text-xl" style={{ color: COLORS[index] }}>
                  {index === 0 ? "🥩" : index === 1 ? "🍚" : "🥑"}
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {item.name === "Protein"
                ? "Building blocks for muscle"
                : item.name === "Carbs"
                ? "Primary energy source"
                : "Essential for hormone production"}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Nutrition Breakdown
            </h2>
            <div className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">
              Daily View
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-3">
              <div className="w-full" style={{ height: "280px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius="60%"
                      outerRadius="80%"
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      labelLine={false}
                    >
                      {data.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke="transparent"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [
                        `${Math.round(Number(value))} cal`,
                        null,
                      ]}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "8px",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                        border: "none",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4 flex flex-col justify-center">
              <h3 className="text-md font-medium text-gray-700 mb-2">
                Nutrient Details
              </h3>
              {data.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: `${COLORS[index]}10` }}
                >
                  <div className="flex items-center">
                    <span
                      className="w-4 h-4 rounded-full inline-block mr-2"
                      style={{ backgroundColor: COLORS[index] }}
                    ></span>
                    <span className="font-medium text-gray-700">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-bold" style={{ color: COLORS[index] }}>
                    {Math.round(item.value as number)} cal
                  </span>
                </div>
              ))}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-500">
                  {caloriePercentage}% of daily goal complete
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Today's Meals
              </h2>
              <Link
                to={`/dashboard/${user}/planning`}
                className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
              >
                Add Meal
              </Link>
            </div>
            <div className="max-h-96 overflow-y-auto pr-1">
              {response && <DailyMeals response={response.meals} />}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Nutrition Progress
          </h2>
          {progressBarData && (
            <NutritionProgress
              data={progressBarData as NutritionType}
              response={data}
            />
          )}

          <div className="mt-8 pt-6 border-t">
            <h3 className="text-md font-medium text-gray-700 mb-4">
              Weekly Stats
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Avg. Calories</p>
                <p className="text-lg font-bold text-gray-800">
                  {Math.round(totalCalories * 0.9)} cal
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Avg. Protein</p>
                <p className="text-lg font-bold text-gray-800">
                  {Math.round((progressBarData?.protein as number) * 0.92)} g
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Best Day</p>
                <p className="text-lg font-bold text-gray-800">Monday</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Streaks</p>
                <p className="text-lg font-bold text-gray-800">5 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
