import { useEffect } from "react";
import { Provider } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import SideNav from "../../components/SideNav";
import store from "../../store/store";

export default function MainDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  return (
    <Provider store={store}>
      <div className="app-shell">
        <SideNav />
        <main className="app-main">
          <div className="app-content">
            <Outlet />
          </div>
        </main>
      </div>
    </Provider>
  );
}
