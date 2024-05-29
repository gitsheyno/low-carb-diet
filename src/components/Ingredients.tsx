import { Ingredient } from "../utils/types";

export default function Ingredients({ data }: { data: Ingredient[] }) {
  console.log(data);
  return <div>Ingredients</div>;
}
