import { ArrowUpRight, SearchX } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useSearchParams } from "react-router";
import fetchSearch from "../utils/fetchSearch";
import Spinner from "./Spinner";

export default function NewRecipes() {
  const [searchParams] = useSearchParams();
  const { user } = useParams();
  const queryData = useQuery({
    queryKey: [
      "search",
      searchParams.get("q") as string,
      localStorage.getItem("token") as string,
    ],
    queryFn: fetchSearch,
  });

  if (queryData.isFetching) return <Spinner label="Finding good matches" />;
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
              <img alt={item.name} loading="lazy" src={item.image} />
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
