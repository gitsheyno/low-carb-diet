import { ArrowLeft, Clock3, Flame, UsersRound } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import fetchRecipe from "../api/fetchRecipe";
import Description from "./Description";
import Ingredients from "./Ingredients";
import Spinner from "../../../shared/components/Spinner";
import Steps from "./Steps";
import RemoteImage from "../../../shared/components/RemoteImage";

export default function RecipeDetails() {
  const { id, user } = useParams<{ id: string; user: string }>();
  const queryData = useQuery({
    queryKey: [
      "searchSingleRecipe",
      id as string,
      localStorage.getItem("token") as string,
    ],
    queryFn: fetchRecipe,
  });
  const response = queryData.data;

  if (queryData.isFetching) return <Spinner label="Preparing the recipe" />;
  if (!response)
    return (
      <div className="surface empty-state">
        <div>
          <h3>Recipe not found</h3>
          <p>This recipe may no longer be available.</p>
          <Link
            className="secondary-action mt-5"
            to={`/dashboard/${user}/Recipes`}
          >
            Back to recipes
          </Link>
        </div>
      </div>
    );

  const totalTime = response.prepareTime + response.cookTime;
  const nutrients = [
    ["Calories", `${response.nutrients.caloriesKCal.toFixed()} kcal`],
    ["Protein", `${response.nutrients.protein.toFixed()} g`],
    ["Fats", `${response.nutrients.fat.toFixed()} g`],
    ["Fiber", `${response.nutrients.fiber.toFixed()} g`],
    ["Sugar", `${response.nutrients.sugar.toFixed()} g`],
    ["Vitamin A", `${response.nutrients.vitaminA.toFixed()} g`],
    ["Calcium", `${response.nutrients.calcium.toFixed()} g`],
  ];

  return (
    <article className="recipe-detail">
      <Link className="secondary-action mb-4" to={`/dashboard/${user}/Recipes`}>
        <ArrowLeft size={15} />
        All recipes
      </Link>
      <div className="recipe-detail__hero">
        <RemoteImage alt={response.name} loading="eager" src={response.image} />
        <div className="recipe-detail__title">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[.16em] text-[#cce895]">
            Recipe details
          </p>
          <h1>{response.name}</h1>
          <div className="recipe-detail__facts">
            <span>
              <Clock3 size={13} className="mr-1 inline" />
              {totalTime} min total
            </span>
            <span>{response.prepareTime} min prep</span>
            <span>{response.cookTime} min cook</span>
            <span>
              <Flame size={13} className="mr-1 inline" />
              {response.nutrients.caloriesKCal.toFixed()} kcal
            </span>
            <span>
              <UsersRound size={13} className="mr-1 inline" />
              {response.servings} servings
            </span>
          </div>
        </div>
      </div>

      <div className="recipe-detail__grid">
        <div>
          <section className="surface recipe-section">
            <p className="page-eyebrow">The story</p>
            <h2>About this recipe</h2>
            <div className="text-sm leading-7 text-[#69766e]">
              <Description data={response.description} />
            </div>
          </section>
          <section className="surface recipe-section" id="recipe">
            <p className="page-eyebrow">What you’ll need</p>
            <h2>Ingredients</h2>
            <Ingredients data={response.ingredients} />
          </section>
          <section className="surface recipe-section">
            <p className="page-eyebrow">From prep to plate</p>
            <h2>Method</h2>
            <Steps data={response.steps} />
          </section>
        </div>
        <aside>
          <section className="surface nutrition-card">
            <p className="page-eyebrow">Per serving</p>
            <h2>Nutrition facts</h2>
            <div className="nutrition-list">
              {nutrients.map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-[#edf3e8] p-4">
              <p className="text-xs font-bold text-[#2f7d55]">Time breakdown</p>
              <p className="mt-2 text-xs leading-5 text-[#69766e]">
                {response.prepareTime} minutes prep · {response.cookTime}{" "}
                minutes cooking
              </p>
            </div>
          </section>
        </aside>
      </div>
    </article>
  );
}
