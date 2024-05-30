import styles from "../routes/Recipe.module.css";

export default function Descriptions({ data }: { data: string }) {
  return <div className={styles.description}>{data}</div>;
}
