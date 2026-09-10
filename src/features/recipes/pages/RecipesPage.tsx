import { BookOpen } from "lucide-react";
import { Suspense } from "react";
import RecipeResults from "../components/RecipeResults";
import SearchInput from "../../../shared/components/SearchInput";
import Spinner from "../../../shared/components/Spinner";

export default function RecipesPage() {
  return (
    <div>
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Recipe library</p>
          <h1>Find something worth cooking.</h1>
          <p>
            Search practical meals with the nutrition details already worked
            out.
          </p>
        </div>
        <span className="page-date-chip">
          <BookOpen size={15} />
          Your recipe space
        </span>
      </header>
      <section className="surface p-4 sm:p-6">
        <SearchInput />
        <div className="mt-6">
          <Suspense fallback={<Spinner label="Finding recipes" />}>
            <RecipeResults />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
