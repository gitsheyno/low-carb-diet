export default function Steps({ data }: { data: string[] }) {
  const steps = data[0].split(".");

  return (
    <div>
      {steps.map((item, index) => (
        <p>
          step : {index} - {item}
        </p>
      ))}
    </div>
  );
}
