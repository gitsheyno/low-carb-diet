import {
  BookOpen,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  UserRound,
} from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router";
import AppBrand from "../../shared/components/AppBrand";
import { useAuth } from "../../features/auth/context/AuthContext";

export default function SideNav() {
  const { user } = useParams();
  const navigate = useNavigate();
  const { logOut, profileConfigured } = useAuth();
  const needsProfile = profileConfigured === false;

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

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login", { replace: true });
    } catch {
      // Keep the user in place if the server could not clear the HTTP-only cookie.
    }
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
            {label === "Profile" && needsProfile && (
              <span
                aria-label="Profile setup needed"
                className="app-nav__notice"
                title="Complete your profile"
              >
                !
              </span>
            )}
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
