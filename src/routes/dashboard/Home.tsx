import { Suspense } from "react";
import Search from "../../components/Search";
import NewRecipes from "../../components/NewRecipes";
import Spinner from "../../components/Spinner";

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Search />
      </div>
      <Suspense
        fallback={
          <div className="py-8 flex justify-center">
            <Spinner />
          </div>
        }
      >
        <NewRecipes />
      </Suspense>
    </div>
  );
}
