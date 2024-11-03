import styles from "./Dashboard.module.css";
import { useNavigate, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import MainPage from "./MainPage";
import fetchUser from "../utils/fetchUser";
import Spinner from "./Spinner";
export default function Dashboard() {
  const { user } = useParams();
  const navigate = useNavigate();
  const res = useQuery({
    queryKey: [
      "userInfo",
      localStorage.getItem("token") as string,
      user as string,
    ],
    queryFn: fetchUser,
  });

  if (res.isLoading) {
    return <Spinner />;
  }

  const response = res?.data;
  const final = response?.message;

  if (!final) {
    navigate("/login");
  }

  return (
    <div className={styles.mm}>
      <MainPage />
    </div>
  );
}
