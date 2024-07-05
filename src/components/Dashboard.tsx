import styles from "./Dashboard.module.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MainPage from "./MainPage";
import fetchUser from "../utils/fetchUser";
import Spinner from "./Spinner";
export default function Dashboard() {
  const { user } = useParams();

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

  return <div>{final ? <>{<MainPage />}</> : <p>protected</p>}</div>;
}
