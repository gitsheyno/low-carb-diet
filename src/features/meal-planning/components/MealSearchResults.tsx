import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router";
import { addMeal } from "../state/mealPlanningSlice";
import searchMeals from "../api/searchMeals";
import RemoteImage from "../../../shared/components/RemoteImage";
import Spinner from "../../../shared/components/Spinner";

export default function MealSearchResults() {
  const [searchParams] = useSearchParams();
  const { user } = useParams();
  const dispatch = useDispatch();
  const query = searchParams.get("q") as string;
  const queryData = useQuery({
    queryKey: ["mealPlanner", localStorage.getItem("token") as string, query],
    queryFn: searchMeals,
  });
  const meals = queryData.data ?? [];

  if (queryData.isFetching) return <Spinner label="Searching meals" />;
  if (queryData.isError)
    return (
      <div className="empty-state" role="alert">
        <div>
          <h3>We couldn’t search meals</h3>
          <p>Check your connection and try again.</p>
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

  if (!meals.length)
    return (
      <div className="empty-state">
        <div>
          <h3>No meals found</h3>
          <p>Try a broader search for “lunch” or an ingredient.</p>
        </div>
      </div>
    );

  return (
    <ul className="grid gap-1">
      {meals.map((meal) => (
        <li className="meal-result" key={meal.id || meal.name}>
          <RemoteImage
            alt={meal.name}
            className="meal-result__image"
            src={meal.image}
          />
          <div className="meal-result__copy">
            <Link to={`/dashboard/${user}/recipe/${meal.id}`}>{meal.name}</Link>
            <p>
              {meal.description
                ? `${meal.description.substring(0, 58)}${
                    meal.description.length > 58 ? "…" : ""
                  }`
                : "A practical option for your plan."}
            </p>
            <span>
              {meal.cookTime || 0} min · {meal.caloriesKCal || 0} kcal
            </span>
          </div>
          <button
            aria-label={`Add ${meal.name} to meal plan`}
            className="icon-button"
            onClick={() => dispatch(addMeal(meal))}
            title="Add to meal plan"
            type="button"
          >
            <Plus size={17} />
          </button>
        </li>
      ))}
    </ul>
  );
}
