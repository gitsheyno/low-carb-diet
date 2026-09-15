import { useEffect } from "react";
import { Provider } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import SideNav from "../components/SideNav";
import store from "../store";

export default function MainDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  return (
    <Provider store={store}>
      <div className="app-shell">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SideNav />
        <main className="app-main" id="main-content">
          <div className="app-content">
            <Outlet />
          </div>
        </main>
      </div>
    </Provider>
  );
}
