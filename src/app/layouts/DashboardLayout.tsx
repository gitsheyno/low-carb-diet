import { Provider } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import SideNav from "../components/SideNav";
import store from "../store";
import { getAuthToken } from "../../features/auth/utils/authStorage";

export default function MainDashboard() {
  const location = useLocation();
  const token = getAuthToken();
  if (!token) {
    return <Navigate replace state={{ from: location.pathname }} to="/login" />;
  }

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
