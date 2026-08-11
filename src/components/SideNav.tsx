import {
  BookOpen,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  UserRound,
} from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router";
import AppBrand from "./AppBrand";

export default function SideNav() {
  const { user } = useParams();
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Today",
      icon: LayoutDashboard,
      path: `/dashboard/${user}`,
      end: true,
    },
    {
      label: "Recipes",
      icon: BookOpen,
      path: `/dashboard/${user}/Recipes`,
      end: false,
    },
    {
      label: "Plan",
      icon: CalendarDays,
      path: `/dashboard/${user}/planning`,
      end: false,
    },
    {
      label: "Profile",
      icon: UserRound,
      path: `/dashboard/${user}/profile`,
      end: false,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="app-sidebar" aria-label="Dashboard navigation">
      <AppBrand />
      <div className="app-sidebar__intro">
        <p className="app-sidebar__eyebrow">Your daily space</p>
        <strong>{user || "Welcome back"}</strong>
      </div>

      <nav className="app-nav">
        {navItems.map(({ label, icon: Icon, path, end }) => (
          <NavLink
            className={({ isActive }) =>
              `app-nav__item${isActive ? " is-active" : ""}`
            }
            end={end}
            key={label}
            to={path}
          >
            <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
        <button
          className="app-nav__logout"
          onClick={handleLogout}
          type="button"
        >
          <LogOut aria-hidden="true" size={20} strokeWidth={1.8} />
          <span>Log out</span>
        </button>
      </nav>
    </aside>
  );
}
