export default function Steps({ data }: { data: string[] }) {
  return (
    <ol className="grid gap-5">
      {data.map((item, index) => (
        <li
          className="grid grid-cols-[36px_1fr] gap-4"
          key={`${index}-${item.slice(0, 20)}`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#173d2b] text-xs font-bold text-white">
            {index + 1}
          </span>
          <p className="pt-1 text-sm leading-7 text-[#59665e]">
            {item.split(",").join(", ")}
          </p>
        </li>
      ))}
    </ol>
  );
}
