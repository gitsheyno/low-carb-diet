import RecipeDetails from "../components/RecipeDetails";
import { Suspense } from "react";
import Spinner from "../../../shared/components/Spinner";

export default function RecipeDetailsPage() {
  return (
    <div>
      <Suspense fallback={<Spinner label="Preparing the recipe" />}>
        <RecipeDetails />
      </Suspense>
    </div>
  );
}
