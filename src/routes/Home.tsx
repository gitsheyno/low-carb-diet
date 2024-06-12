import Banner from "../components/Banner";
import Search from "../components/Search";
import styles from "../components/Protected.module.css";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import container from "../components/HomeContainer.module.css";
import NewRecipes from "../components/NewRecipes";
import Spinner from "../components/Spinner";
import fetchSearch from "../utils/fetchSearch";
export default function Home() {
  const searchParams = useSearchParams();
  const queryData = useQuery({
    queryKey: [
      "search",
      (searchParams[0].get("q") as string) || "pizza",
      localStorage.getItem("token") as string,
    ],
    queryFn: fetchSearch,
  });

  if (queryData.isLoading) {
    return <Spinner />;
  }
  const response = queryData?.data ?? [];

  return (
    <>
      {response ? (
        <div className={styles.container}>
          <div className={styles.box}>
            <Banner data={response[1]} />
            <Search />
          </div>
          <div className={container.mainContainer}>
            <NewRecipes response={response} />
          </div>
        </div>
      ) : (
        <p>no Recipe</p>
      )}
    </>
  );
}
