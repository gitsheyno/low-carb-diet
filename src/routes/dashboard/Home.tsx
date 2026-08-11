import { BookOpen } from "lucide-react";
import { Suspense } from "react";
import NewRecipes from "../../components/NewRecipes";
import Search from "../../components/Search";
import Spinner from "../../components/Spinner";

export default function Home() {
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
        <Search />
        <div className="mt-6">
          <Suspense fallback={<Spinner label="Finding recipes" />}>
            <NewRecipes />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
