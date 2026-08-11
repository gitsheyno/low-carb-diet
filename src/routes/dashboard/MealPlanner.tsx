import { CalendarDays, Search as SearchIcon } from "lucide-react";
import { Suspense } from "react";
import { useSearchParams } from "react-router";
import Meals from "../../components/Meals";
import RenderMeals from "../../components/RenderMeals";
import Search from "../../components/Search";
import Spinner from "../../components/Spinner";

export default function MealPlanner() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") as string;

  return (
    <div>
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Meal planner</p>
          <h1>Plan with less effort.</h1>
          <p>
            Find meals, build a balanced day, and save it when it feels right.
          </p>
        </div>
        <span className="page-date-chip">
          <CalendarDays size={15} />
          Flexible by design
        </span>
      </header>
      <div className="planner-grid">
        <section className="surface planner-panel">
          <div className="surface-header">
            <div>
              <h2>Find meals</h2>
              <p>Search by a meal, ingredient, or craving.</p>
            </div>
            <SearchIcon color="#2f7d55" size={19} />
          </div>
          <Search />
          <div className="mt-5">
            {query ? (
              <Suspense fallback={<Spinner label="Searching meals" />}>
                <RenderMeals />
              </Suspense>
            ) : (
              <div className="empty-state">
                <div>
                  <span className="empty-state__icon">
                    <SearchIcon size={20} />
                  </span>
                  <h3>What sounds good?</h3>
                  <p>Search above to start building your plan.</p>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="surface planner-panel">
          <div className="surface-header">
            <div>
              <h2>Your meal plan</h2>
              <p>Review the nutrition as you add meals.</p>
            </div>
            <span className="soft-chip">Today</span>
          </div>
          <Meals />
        </section>
      </div>
    </div>
  );
}
