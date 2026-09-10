interface NutritionType {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
interface Limit {
  name: string;
  value: number | undefined;
}

export default function NutritionProgress({
  data,
  response,
}: {
  data: NutritionType;
  response: Limit[];
}) {
  const nutrients = [
    { name: "Protein", value: Math.round(data.protein), color: "#2f7d55" },
    { name: "Carbs", value: Math.round(data.carbs), color: "#e3b957" },
    { name: "Fat", value: Math.round(data.fat), color: "#e87b5a" },
    { name: "Calories", value: Math.round(data.calories), color: "#66826f" },
  ];

  return (
    <div className="grid gap-5">
      {nutrients.map((nutrient, index) => {
        const max = response[index]?.value || 100;
        const percentage = Math.min(100, (nutrient.value / max) * 100);
        return (
          <div key={nutrient.name}>
            <div className="mb-2 flex items-center justify-between gap-3 text-xs">
              <span className="font-bold text-[#58645d]">{nutrient.name}</span>
              <span className="font-semibold text-[#7a857e]">
                {nutrient.value} / {Math.round(max)}
                {nutrient.name === "Calories" ? " kcal" : "g"}
              </span>
            </div>
            <div
              className="h-2 overflow-hidden rounded-full bg-[#e9ece6]"
              role="progressbar"
              aria-label={`${nutrient.name} progress`}
              aria-valuemax={Math.round(max)}
              aria-valuemin={0}
              aria-valuenow={nutrient.value}
            >
              <span
                className="block h-full rounded-full"
                style={{ background: nutrient.color, width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
      <div className="mt-1 rounded-2xl bg-[#edf3e8] p-4">
        <p className="text-xs font-bold text-[#2f7d55]">A useful rhythm</p>
        <p className="mt-1 text-xs leading-5 text-[#69766e]">
          Small, consistent choices matter more than a perfect day.
        </p>
      </div>
    </div>
  );
}
