import { Link, Outlet } from "react-router-dom";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <>
      <div className={styles.navContainer}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Link to="/home" className={styles.navLink}>
              My App
            </Link>
          </div>
          <div className={styles.navLinks}>
            <Link to="/home" className={styles.navLink}>
              Home
            </Link>
            <Link to="/login" className={styles.navLink}>
              Login
            </Link>
            <Link to="/protected" className={styles.navLink}>
              Protected
            </Link>
          </div>
        </nav>
      </div>
      <section className={styles.outlet}>
        <Outlet />
      </section>
    </>
  );
}
