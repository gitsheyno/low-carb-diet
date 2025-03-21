import RecipeDetails from "../components/RecipesDetails";
import { Suspense } from "react";

export default function Recipe() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center h-screen bg-white">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading recipe...</p>
          </div>
        }
      >
        <RecipeDetails />
      </Suspense>
    </div>
  );
}
