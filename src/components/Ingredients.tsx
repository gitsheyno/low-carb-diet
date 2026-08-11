import { Check } from "lucide-react";
import type { Ingredient } from "../utils/types";

export default function Ingredients({ data }: { data: Ingredient[] }) {
  if (!data?.length)
    return (
      <p className="text-sm text-[#69766e]">No ingredient details available.</p>
    );
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {data.map((item) => (
        <li
          className="flex items-start gap-3 rounded-xl bg-[#f6f5ef] p-3 text-sm"
          key={item.name}
        >
          <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-[#dfead7] text-[#2f7d55]">
            <Check size={12} />
          </span>
          <span>
            <strong className="mr-1 font-semibold">
              {String(item.servingSize?.desc ?? "")}
            </strong>
            {item.name}
          </span>
        </li>
      ))}
    </ul>
  );
}
