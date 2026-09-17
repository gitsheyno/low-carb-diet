import { Provider } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import SideNav from "../components/SideNav";
import store from "../store";
import { useAuth } from "../../features/auth/context/AuthContext";
import Spinner from "../../shared/components/Spinner";

export default function MainDashboard() {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Spinner fullScreen label="Checking your session" />;

  if (!isAuthenticated) {
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
