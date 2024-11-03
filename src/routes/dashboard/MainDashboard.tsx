import { Outlet, useNavigate } from "react-router-dom";
import SideNav from "../../components/SideNav";
import styles from "../../components/Dashboard.module.css";
import { Provider } from "react-redux";
import store from "../../store/store";
import { useEffect } from "react";
export default function MainDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <Provider store={store}>
      <div className={styles.container}>
        <div className={styles.side}>
          <SideNav />
        </div>
        <main className={styles.mainPage}>
          <Outlet />
        </main>
      </div>
    </Provider>
  );
}
