import { CalendarDays, Search as SearchIcon } from "lucide-react";
import { Suspense } from "react";
import { useSearchParams } from "react-router";
import MealPlanSummary from "../components/MealPlanSummary";
import MealSearchResults from "../components/MealSearchResults";
import SearchInput from "../../../shared/components/SearchInput";
import Spinner from "../../../shared/components/Spinner";

export default function MealPlannerPage() {
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
          <SearchInput />
          <div className="mt-5">
            {query ? (
              <Suspense fallback={<Spinner label="Searching meals" />}>
                <MealSearchResults />
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
          <MealPlanSummary />
        </section>
      </div>
    </div>
  );
}
