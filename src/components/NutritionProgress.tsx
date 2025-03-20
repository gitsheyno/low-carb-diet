import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface NutritionType {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface Limit {
  name: string;
  value: number | undefined;
}

export default function NutritionProgress({
  data,
  response,
}: {
  data: NutritionType;
  response: Limit[];
}) {
  const nutrients = [
    {
      name: "Protein",
      value: Math.round(data.protein),
      color: "#4F46E5",
      icon: "🥩",
    },
    {
      name: "Carbs",
      value: Math.round(data.carbs),
      color: "#16A34A",
      icon: "🍚",
    },
    { name: "Fat", value: Math.round(data.fat), color: "#F59E0B", icon: "🥑" },
    {
      name: "Calories",
      value: Math.round(data.calories),
      color: "#EF4444",
      icon: "🔥",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-5">
        {nutrients.map((nutrient, index) => {
          const max = response[index].value || 100;
          const percentage = Math.min(100, (nutrient.value / max) * 100);
          const status =
            percentage < 50
              ? "Deficient"
              : percentage < 90
              ? "On Track"
              : percentage <= 100
              ? "Optimal"
              : "Excess";

          return (
            <div key={nutrient.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="mr-2 text-lg">{nutrient.icon}</span>
                  <label className="text-sm font-medium text-gray-700">
                    {nutrient.name}
                  </label>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    status === "Optimal"
                      ? "bg-green-100 text-green-600"
                      : status === "On Track"
                      ? "bg-blue-100 text-blue-600"
                      : status === "Deficient"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {status}
                </span>
              </div>

              <div className="flex justify-between items-center mb-1">
                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden mr-3">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: nutrient.color,
                      transition: "width 0.5s ease-in-out",
                    }}
                  ></div>
                </div>
                <span
                  className="text-sm font-medium whitespace-nowrap"
                  style={{ color: nutrient.color }}
                >
                  {nutrient.value} / {Math.round(max as number)}
                  {nutrient.name === "Calories" ? " cal" : "g"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-4">
        <DotLottieReact
          loop
          autoplay
          src="../animation.lottie"
          width={200}
          height={150}
        />
      </div>

      {/* Recommendations Section */}
      <div className="bg-blue-50 rounded-lg p-4 mt-4">
        <h3 className="text-md font-medium text-blue-600 mb-2">
          Daily Insights
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <svg
              className="h-5 w-5 text-blue-500 mr-1.5 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            You're doing great with protein intake, keep it up!
          </li>
          <li className="flex items-start">
            <svg
              className="h-5 w-5 text-yellow-500 mr-1.5 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Try to increase your carb intake at lunch time
          </li>
          <li className="flex items-start">
            <svg
              className="h-5 w-5 text-blue-500 mr-1.5 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            You're 75% towards your calorie goal today
          </li>
        </ul>
      </div>
    </div>
  );
}
