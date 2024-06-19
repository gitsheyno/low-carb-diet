import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import SideNav from "./SideNav";
import MainPage from "./MainPage";
export default function Dashboard() {
  const [auth, setAuth] = useState<boolean>(false);
  useEffect(() => {
    const load = async () => {
      const res = await fetch(`http://localhost:3002/api/dashboard/`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!res.ok) {
        throw new Error(`pet search is not ok`);
      }

      const ans = await res.json();
      setAuth(ans.message);
      console.log(ans, "ans");
    };

    load();
  }, []);
  return (
    <div className={styles.container}>
      {auth ? (
        <>
          <SideNav />
          <MainPage />
        </>
      ) : (
        <p>protected</p>
      )}
    </div>
  );
}
