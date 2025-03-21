export default function Steps({ data }: { data: string[] }) {
  const steps = data.map((item) => item.split(","));

  return (
    <div className="col-span-full flex flex-col gap-8">
      {steps.map((item, index) => (
        <div key={index}>
          <p className="text-xl text-orange-500 mb-4">Step {index}</p>
          <p className="text-xl">{item}</p>
        </div>
      ))}
    </div>
  );
}
