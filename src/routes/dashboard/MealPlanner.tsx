import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import Search from "../../components/Search";
import Meals from "../../components/Meals";
import RenderMeals from "../../components/RenderMeals";
import Spinner from "../../components/Spinner";

export default function MealPlanner() {
  const searchParams = useSearchParams();
  const query = searchParams[0].get("q") as string;

  return (
    <div className="flex flex-col md:flex-row w-full gap-6 p-4 bg-gray-50 min-h-screen">
      <div className="w-full md:w-1/2 flex flex-col rounded-xl bg-white shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Find Meals</h2>
        <div className="mb-4">
          <Search />
        </div>

        {query && (
          <div className="flex-1 overflow-auto">
            <h3 className="text-md font-medium mb-2 text-gray-600">
              Search Results
            </h3>
            <div className="bg-gray-50 rounded-lg p-3">
              <ul className="divide-y divide-gray-200">
                <Suspense
                  fallback={
                    <div className="flex justify-center py-8">
                      <Spinner />
                    </div>
                  }
                >
                  <RenderMeals />
                </Suspense>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="w-full md:w-1/2 rounded-xl bg-white shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Meal Plan</h2>
        <Meals />
      </div>
    </div>
  );
}
