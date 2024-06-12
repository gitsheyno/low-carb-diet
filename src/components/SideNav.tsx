import styles from "./Dashboard.module.css";
import ProfileInfo from "./ProfileInfo";
import { Link, useParams } from "react-router-dom";
export default function SideNav() {
  const { user } = useParams();
  return (
    <div className={styles.sideNav}>
      <nav className={styles.sideNavList}>
        <div className={styles.profileInfo}>
          <Link to="#">
            <ProfileInfo />
          </Link>
        </div>
        <div className={styles.items}>
          <Link to={`/dashboard/${user}`}>Dashboard</Link>
          <Link to={`/dashboard/${user}`}>Recipes</Link>
          <Link to={`/dashboard/${user}`}>Meal Planner</Link>
          <Link to={`/dashboard/${user}`}>Calories Tracker</Link>
          <Link to={`/dashboard/${user}`}>Favorites</Link>
          <Link to={`/dashboard/${user}`}>Shopping List</Link>
          <Link to={`/dashboard/${user}`}>Profile</Link>
        </div>
        <div className={styles.btn}>
          <Link to={`/dashboard/:${user}`}>Logout</Link>
        </div>
      </nav>
    </div>
  );
}
