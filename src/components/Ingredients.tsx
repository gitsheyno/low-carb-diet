import { Ingredient } from "../utils/types";

export default function Ingredients({ data }: { data: Ingredient[] }) {
  return (
    <>
      {data ? (
        <div id="recipe" className="col-span-full flex flex-col">
          <b className="text-2xl mb-8 font-black">Ingredients</b>
          <ul className="flex flex-col gap-4">
            {data.map((item) => (
              <li key={item.name} className="flex list-none">
                <p className="mr-2">{item?.servingSize?.desc} </p>
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>no data</p>
      )}
    </>
  );
}
