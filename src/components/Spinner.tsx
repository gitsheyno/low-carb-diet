import styles from "./Spinner.module.css";

export default function Spinner({
  fullScreen = false,
  label = "Loading",
}: {
  fullScreen?: boolean;
  label?: string;
}) {
  return (
    <div
      className={`${styles.wrapper}${
        fullScreen ? ` ${styles.fullScreen}` : ""
      }`}
      role="status"
    >
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
