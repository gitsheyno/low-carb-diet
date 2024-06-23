import { Outlet } from "react-router-dom";
import SideNav from "../../components/SideNav";
import styles from "../../components/Dashboard.module.css";
export default function MainDashboard() {
  return (
    <div className={styles.container}>
      <SideNav data={"hasan"} />
      <main className={styles.mainPage}>
        <Outlet />
      </main>
    </div>
  );
}
