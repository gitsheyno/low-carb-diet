import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import SideNav from "../components/SideNav";
import store from "../store";
import {
  getAuthToken,
  getStoredProfileStatus,
  setProfileConfigured,
} from "../../features/auth/utils/authStorage";
import fetchDailyMeals from "../../features/dashboard/api/fetchDailyMeals";
import Spinner from "../../shared/components/Spinner";

export default function MainDashboard() {
  const location = useLocation();
  const token = getAuthToken();
  const storedProfileStatus = getStoredProfileStatus();
  const profileQuery = useQuery({
    queryKey: ["getDailyMeals", token as string],
    queryFn: fetchDailyMeals,
    enabled: Boolean(token) && storedProfileStatus !== false,
  });

  useEffect(() => {
    if (profileQuery.data) setProfileConfigured(profileQuery.data.status);
  }, [profileQuery.data]);

  if (!token) {
    return <Navigate replace state={{ from: location.pathname }} to="/login" />;
  }

  const profileConfigured = profileQuery.data?.status ?? storedProfileStatus;
  const isProfileRoute = location.pathname.endsWith("/profile");

  if (profileConfigured === null && profileQuery.isFetching) {
    return <Spinner fullScreen label="Checking your profile" />;
  }

  if ((profileConfigured ?? false) === false && !isProfileRoute) {
    const basePath = location.pathname.match(/^\/dashboard\/[^/]+/)?.[0];
    return <Navigate replace to={`${basePath ?? "/dashboard"}/profile`} />;
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
