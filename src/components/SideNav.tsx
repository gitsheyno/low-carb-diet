import styles from "./Dashboard.module.css";
import ProfileInfo from "./ProfileInfo";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function SideNav({ data }: { data: string }) {
  const { user } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className={styles.sideNav}>
      <nav className={styles.sideNavList}>
        <div className={styles.profileInfo}>
          <Link to="#">
            <ProfileInfo info={data} />
          </Link>
        </div>
        <div className={styles.items}>
          <Link to={`/dashboard/${user}`}>Dashboard</Link>
          <Link to={`/dashboard/${user}/Recipes`}>Recipes</Link>
          <Link to={`/dashboard/${user}/planing`}>Meal Planner</Link>
          <Link to={`/dashboard/${user}`}>Calories Tracker</Link>
          <Link to={`/dashboard/${user}`}>Favorites</Link>
          <Link to={`/dashboard/${user}`}>Shopping List</Link>
          <Link to={`/dashboard/${user}/profile`}>Profile</Link>
        </div>
        <div className={styles.btn}>
          {/* <Link to={`//:${user}`}>Logout</Link> */}
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </div>
      </nav>
    </div>
  );
}
