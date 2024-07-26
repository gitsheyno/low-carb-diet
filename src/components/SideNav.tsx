import styles from "./Dashboard.module.css";
import ProfileInfo from "./ProfileInfo";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userProfileCTX } from "../store/UserProfileContext";
export default function SideNav() {
  const { user } = useParams();
  const navigate = useNavigate();
  const { completed } = useContext(userProfileCTX);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={styles.sideNav}>
      <nav className={styles.sideNavList}>
        <div className={styles.profileInfo}>
          <Link to="#">
            <ProfileInfo info={user as string} />
          </Link>
        </div>
        <ul className="text-white space-y-8 text-l">
          <li className="hover:text-black">
            <Link to={`/dashboard/${user}`}>Dashboard</Link>
          </li>
          <li className="hover:text-black">
            <Link to={`/dashboard/${user}/Recipes`}>Recipes</Link>
          </li>
          <li className="hover:text-black">
            <Link to={`/dashboard/${user}/planing`}>Meal Planner</Link>
          </li>
          {/* <li className="hover:text-black">
            <Link to={`/dashboard/${user}`}>Calories Tracker</Link>
          </li> */}
          <li
            className={`${
              !completed ? "text-red-700" : "text-white"
            } hover:text-black`}
          >
            {!completed && <span>❗️ </span>}
            <Link to={`/dashboard/${user}/profile`}>Profile</Link>
          </li>
        </ul>
        <div className={styles.btn}>
          {/* <Link to={`//:${user}`}>Logout</Link> */}
          <a className="text-white px-2 py-1" href="#" onClick={handleLogout}>
            Logout
          </a>
        </div>
      </nav>
    </div>
  );
}
