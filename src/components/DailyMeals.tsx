import { Link, useParams } from "react-router-dom";
import type { Meal } from "../utils/fetchMeals";

export default function DailyMeals({ response }: { response: Meal[] }) {
  const { user } = useParams();

  if (!response.length) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-gray-500 mb-2">No meals found for today</p>
          <Link
            to={`/dashboard/${user}/planning`}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium px-4 py-2 bg-blue-50 rounded-full"
          >
            Add a meal
          </Link>
        </div>
      </div>
    );
  }

  // Group meals by type
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];
  const groupedMeals = response.reduce((acc, meal, index) => {
    // For this example, we're assigning meal types based on index
    // In a real app, this would come from the meal data
    const type = mealTypes[index % mealTypes.length];
    if (!acc[type]) acc[type] = [];
    acc[type].push(meal);
    return acc;
  }, {} as Record<string, Meal[]>);

  return (
    <div className="space-y-4">
      {Object.entries(groupedMeals).map(([type, meals]) => (
        <div key={type} className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500">{type}</h3>
          <ul className="space-y-3">
            {meals.map((item) => {
              const date = new Date(item.createdAT as string);
              const day = date.getDate();
              const month = date.toLocaleString("default", { month: "short" });

              // Calculate macros percentage
              const totalCal = item.calories;
              const proteinPct = Math.round(
                ((item.protein * 4) / totalCal) * 100
              );
              const carbsPct = Math.round(((item.carbs * 4) / totalCal) * 100);
              const fatPct = Math.round(((item.protein * 9) / totalCal) * 100);

              return (
                <li
                  key={item.id}
                  className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors border border-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-gray-200">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/48?text=Meal";
                          }}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <Link
                          to={`/dashboard/${user}/recipe/${item.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {item.name}
                        </Link>
                        <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-medium">
                          Completed
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {Math.round(item.calories)} calories
                      </p>

                      {/* Macros visual representation */}
                      <div className="flex h-1.5 w-full mt-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-500"
                          style={{ width: `${proteinPct}%` }}
                        ></div>
                        <div
                          className="bg-green-500"
                          style={{ width: `${carbsPct}%` }}
                        ></div>
                        <div
                          className="bg-yellow-500"
                          style={{ width: `${fatPct}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{Math.round(item.protein)}g P</span>
                        <span>{Math.round(item.carbs)}g C</span>
                        <span>{Math.round(item.protein)}g F</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-3 pt-2 border-t border-gray-200">
                    <div className="flex items-center">
                      <span className="mr-1">🍽️</span>
                      {type}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1">🗓️</span>
                      {`${day} ${month}`}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
