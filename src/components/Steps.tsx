import styles from "../routes/Recipe.module.css";

export default function Steps({ data }: { data: string[] }) {
  const steps = data.map((item) => item.split(","));

  return (
    <div className={styles.steps}>
      {steps.map((item, index) => (
        <div key={index}>
          <p>Step {index}</p>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
}
