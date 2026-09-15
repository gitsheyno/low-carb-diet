import { ArrowUpRight, SearchX } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useSearchParams } from "react-router";
import searchRecipes from "../api/searchRecipes";
import Spinner from "../../../shared/components/Spinner";
import RemoteImage from "../../../shared/components/RemoteImage";

export default function RecipeResults() {
  const [searchParams] = useSearchParams();
  const { user } = useParams();
  const queryData = useQuery({
    queryKey: [
      "search",
      searchParams.get("q") as string,
      localStorage.getItem("token") as string,
    ],
    queryFn: searchRecipes,
  });

  if (queryData.isFetching) return <Spinner label="Finding good matches" />;
  if (queryData.isError)
    return (
      <div className="empty-state" role="alert">
        <div>
          <span className="empty-state__icon">
            <SearchX size={20} />
          </span>
          <h3>Search is unavailable</h3>
          <p>We couldn’t load recipes. Check your connection and try again.</p>
          <button
            className="secondary-action mt-5"
            onClick={() => queryData.refetch()}
            type="button"
          >
            Try again
          </button>
        </div>
      </div>
    );
  const response = queryData.data ?? [];

  if (!response.length) {
    return (
      <div className="empty-state">
        <div>
          <span className="empty-state__icon">
            <SearchX size={20} />
          </span>
          <h3>Start with an ingredient or meal</h3>
          <p>Try something like “salmon”, “quick lunch”, or “warm bowl”.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-results">
      {response.map((item) => (
        <article className="product-recipe-card" key={item.id}>
          <Link
            className="block no-underline"
            to={`/dashboard/${user}/recipe/${item.id}`}
          >
            <div className="product-recipe-card__image">
              <RemoteImage alt={item.name} src={item.image} />
            </div>
            <div className="product-recipe-card__body">
              <div className="flex items-start justify-between gap-3">
                <h3>{item.name}</h3>
                <span className="icon-button">
                  <ArrowUpRight size={16} />
                </span>
              </div>
              <div className="macro-row">
                <div>
                  <span>Calories</span>
                  <strong>{item.nutrients.caloriesKCal}</strong>
                </div>
                <div>
                  <span>Protein</span>
                  <strong>{item.nutrients.protein}g</strong>
                </div>
                <div>
                  <span>Carbs</span>
                  <strong>{item.nutrients.totalCarbs}g</strong>
                </div>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
