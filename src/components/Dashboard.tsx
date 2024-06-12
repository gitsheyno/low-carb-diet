import styles from "./Dashboard.module.css";
import SideNav from "./SideNav";
import MainPage from "./MainPage";
export default function Dashboard() {
  return (
    <div className={styles.container}>
      <SideNav />
      <MainPage />
    </div>
  );
}
