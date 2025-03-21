import { Outlet, useNavigate } from "react-router-dom";
import SideNav from "../../components/SideNav";
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
      <div className="max-w-[80%] mx-auto h-screen flex rounded-lg [&::-webkit-scrollbar]:hidden">
        <div className="absolute">
          <SideNav />
        </div>
        <main className="w-full mt-20 h-[85%] p-4 grid overflow-y-scroll">
          <Outlet />
        </main>
      </div>
    </Provider>
  );
}
