import {
  ArrowRight,
  CalendarDays,
  CircleAlert,
  Flame,
  Leaf,
  Plus,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Link, useParams } from "react-router";
import fetchDailyMeals from "../api/fetchDailyMeals";
import DailyMeals from "./DailyMeals";
import NutritionProgress from "./NutritionProgress";
import Spinner from "../../../shared/components/Spinner";
import { setProfileConfigured } from "../../auth/utils/authStorage";

interface NutritionType {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export default function DashboardOverview() {
  const colors = ["#2f7d55", "#e3b957", "#e87b5a"];
  const { user } = useParams();
  const query = useQuery({
    queryKey: ["getDailyMeals", localStorage.getItem("token") as string],
    queryFn: fetchDailyMeals,
  });
  const response = query.data;

  useEffect(() => {
    if (response) setProfileConfigured(response.status);
  }, [response]);

  if (query.isFetching) return <Spinner label="Preparing your day" />;
  if (query.isError)
    return (
      <div className="surface empty-state page-state">
        <div>
          <span className="empty-state__icon">
            <Leaf size={20} />
          </span>
          <h3>We couldn’t load your day</h3>
          <p>Check your connection, then try again.</p>
          <button
            className="primary-action mt-5"
            onClick={() => query.refetch()}
            type="button"
          >
            Try again
          </button>
        </div>
      </div>
    );

  const data = [
    { name: "Protein", value: response?.proteinCal },
    { name: "Carbs", value: response?.carbsCal },
    { name: "Fat", value: response?.fatCal },
  ];

  const progressBarData = response?.meals.reduce(
    (total, meal) => ({
      calories: total.calories + meal.calories,
      protein: total.protein + meal.protein,
      carbs: total.carbs + meal.carbs,
      fat: total.fat + meal.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
  const totalCalories = progressBarData?.calories || 0;
  const calorieGoal = response?.calories || 2000;
  const caloriePercentage = Math.min(
    100,
    Math.round((totalCalories / calorieGoal) * 100)
  );

  const summaryCards = [
    {
      label: "Calories",
      value: `${Math.round(totalCalories)} / ${Math.round(calorieGoal)}`,
      unit: "kcal",
      tone: "#2f7d55",
      icon: Flame,
    },
    {
      label: "Protein target",
      value: Math.round(response?.proteinGram || 0),
      unit: "g",
      tone: "#e87b5a",
      icon: Leaf,
    },
    {
      label: "Carb target",
      value: Math.round(response?.carbsGram || 0),
      unit: "g",
      tone: "#e3b957",
      icon: Leaf,
    },
    {
      label: "Meals today",
      value: response?.meals.length || 0,
      unit: "logged",
      tone: "#66826f",
      icon: CalendarDays,
    },
  ];

  return (
    <div>
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Today’s overview</p>
          <h1>Good to see you, {user || "there"}.</h1>
          <p>
            A calm view of what you have planned, logged, and still have room
            for.
          </p>
        </div>
        <span className="page-date-chip">
          <CalendarDays size={15} />
          {new Intl.DateTimeFormat("en", {
            weekday: "long",
            month: "short",
            day: "numeric",
          }).format(new Date())}
        </span>
      </header>

      {response?.status === false && (
        <section
          className="profile-reminder"
          aria-labelledby="profile-reminder-title"
        >
          <span className="profile-reminder__icon" aria-hidden="true">
            <CircleAlert size={22} />
          </span>
          <div>
            <p className="page-eyebrow">Your targets need a few details</p>
            <h2 id="profile-reminder-title">Finish setting up your profile</h2>
            <p>
              Add your body details, activity level, and goal so Plateful can
              calculate meaningful daily targets. You can still explore the app
              now.
            </p>
          </div>
          <Link className="primary-action" to={`/dashboard/${user}/profile`}>
            Complete profile <ArrowRight size={16} />
          </Link>
        </section>
      )}

      <section
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 mb-6"
        aria-label="Daily nutrition summary"
      >
        {summaryCards.map(({ label, value, unit, tone, icon: Icon }) => (
          <article className="surface p-5" key={label}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[#69766e]">{label}</p>
                <p className="mt-2 text-2xl font-bold tracking-tight text-[#18251e]">
                  {value}{" "}
                  <span className="text-xs font-semibold text-[#89938d]">
                    {unit}
                  </span>
                </p>
              </div>
              <span
                className="grid h-10 w-10 place-items-center rounded-xl"
                style={{ color: tone, backgroundColor: `${tone}18` }}
              >
                <Icon size={19} />
              </span>
            </div>
            {label === "Calories" && (
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#e8ebe5]">
                <span
                  className="block h-full rounded-full bg-[#2f7d55]"
                  style={{ width: `${caloriePercentage}%` }}
                />
              </div>
            )}
          </article>
        ))}
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_.65fr]">
        <section className="surface p-5 sm:p-7">
          <div className="surface-header">
            <div>
              <h2>Your nutrition picture</h2>
              <p>Targets and today’s logged meals at a glance.</p>
            </div>
            <span className="soft-chip">{caloriePercentage}% logged</span>
          </div>
          <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-[.8fr_1.2fr]">
            <div className="h-[250px]">
              <ResponsiveContainer height="100%" width="100%">
                <PieChart>
                  <Pie
                    cx="50%"
                    cy="50%"
                    data={data}
                    dataKey="value"
                    innerRadius="62%"
                    outerRadius="84%"
                    paddingAngle={4}
                    stroke="transparent"
                  >
                    {data.map((item, index) => (
                      <Cell fill={colors[index]} key={item.name} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [
                      `${Math.round(Number(value))} kcal`,
                      "",
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid gap-3">
              {data.map((item, index) => (
                <div
                  className="flex items-center justify-between rounded-xl border border-[#18251e14] px-4 py-3"
                  key={item.name}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: colors[index] }}
                    />
                    <span className="text-sm font-semibold text-[#69766e]">
                      {item.name}
                    </span>
                  </div>
                  <strong className="text-sm">
                    {Math.round(item.value || 0)} kcal
                  </strong>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 border-t border-[#18251e14] pt-6">
            <div className="surface-header">
              <div>
                <h2>Meals today</h2>
                <p>Everything currently counted in your day.</p>
              </div>
              <Link
                className="primary-action"
                to={`/dashboard/${user}/planning`}
              >
                <Plus size={15} />
                Add meal
              </Link>
            </div>
            {response && <DailyMeals response={response.meals} />}
          </div>
        </section>

        <aside className="grid content-start gap-6">
          <section className="surface p-5 sm:p-7">
            <div className="surface-header">
              <div>
                <h2>Daily progress</h2>
                <p>Your current balance.</p>
              </div>
            </div>
            {progressBarData ? (
              <NutritionProgress
                data={progressBarData as NutritionType}
                goals={[
                  response?.proteinGram,
                  response?.carbsGram,
                  response?.fatGram,
                  response?.calories,
                ]}
              />
            ) : (
              <p className="text-sm text-[#69766e]">
                Add a meal to see your progress.
              </p>
            )}
          </section>
          <section className="surface overflow-hidden p-6 bg-[#173d2b] text-white">
            <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#cce895]">
              Next step
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-none">
              Make tomorrow easier.
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/65">
              Choose a few meals now and give your week a little more breathing
              room.
            </p>
            <Link
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#cce895] no-underline"
              to={`/dashboard/${user}/planning`}
            >
              Open meal planner <ArrowRight size={16} />
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
