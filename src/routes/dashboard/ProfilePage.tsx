import Profile from "../../components/Profile";
import styles from "../../components/Dashboard.module.css";
export default function ProfilePage() {
  return (
    <div className={styles.profile}>
      <Profile />
    </div>
  );
}
