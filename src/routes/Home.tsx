import Banner from "../components/Banner";
import Search from "../components/Search";
import styles from "../components/Protected.module.css";
import { useQuery } from "@tanstack/react-query";
import fetchInitialRecipes from "../utils/fetchInitialRecipes";
import container from "../components/HomeContainer.module.css";
import NewRecipes from "../components/NewRecipes";
export default function Protected() {
  const queryData = useQuery({
    queryKey: [
      "initialRecipes",
      "api",
      localStorage.getItem("token") as string,
    ],
    queryFn: fetchInitialRecipes,
  });

  const response = queryData?.data ?? [];
  console.log(response);
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <Banner data={response[0]} />
        <Search />
      </div>
      <div className={container.mainContainer}>
        <NewRecipes response={response} />
        <NewRecipes response={response} />
        <NewRecipes response={response} />
      </div>
    </div>
  );
}
