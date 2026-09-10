import { ArrowUpRight, CalendarDays, Utensils } from "lucide-react";
import { Link, useParams } from "react-router";
import type { Meal } from "../api/fetchDailyMeals";

export default function DailyMeals({ response }: { response: Meal[] }) {
  const { user } = useParams();

  if (!response.length) {
    return (
      <div className="empty-state rounded-2xl bg-[#f4f5ef]">
        <div>
          <span className="empty-state__icon">
            <Utensils size={20} />
          </span>
          <h3>Nothing logged yet</h3>
          <p>Build your day one meal at a time.</p>
          <Link
            className="primary-action mt-5"
            to={`/dashboard/${user}/planning`}
          >
            Find a meal
          </Link>
        </div>
      </div>
    );
  }

  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];
  return (
    <ul className="grid gap-2">
      {response.map((item, index) => {
        const date = new Date(item.createdAT as string);
        const readableDate = Number.isNaN(date.getTime())
          ? "Today"
          : date.toLocaleDateString("en", { month: "short", day: "numeric" });
        return (
          <li
            className="flex items-center gap-3 rounded-2xl border border-transparent bg-[#f6f5ef] p-3 transition hover:border-[#18251e1a]"
            key={item.id}
          >
            <div className="h-14 w-14 flex-none overflow-hidden rounded-xl bg-[#e3e7df]">
              {item.image ? (
                <img
                  alt={item.name}
                  className="h-full w-full object-cover"
                  src={item.image}
                />
              ) : (
                <span className="grid h-full place-items-center text-[#69766e]">
                  <Utensils size={18} />
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <Link
                className="block truncate text-sm font-bold text-[#18251e] no-underline"
                to={`/dashboard/${user}/recipe/${item.id}`}
              >
                {item.name}
              </Link>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] font-semibold text-[#78827c]">
                <span className="flex items-center gap-1">
                  <Utensils size={12} />
                  {mealTypes[index % mealTypes.length]}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarDays size={12} />
                  {readableDate}
                </span>
              </div>
            </div>
            <div className="hidden text-right sm:block">
              <strong className="block text-sm">
                {Math.round(item.calories)} kcal
              </strong>
              <span className="text-[11px] text-[#78827c]">Completed</span>
            </div>
            <Link
              aria-label={`View ${item.name}`}
              className="icon-button"
              to={`/dashboard/${user}/recipe/${item.id}`}
            >
              <ArrowUpRight size={16} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
