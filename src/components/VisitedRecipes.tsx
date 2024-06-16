import fetchSearch from "../utils/fetchSearch";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";
import styles from "./VisitedRecipes.module.css";
import SmallCard from "./SmallCard";
export default function VisitedRecipes() {
  const queryData = useQuery({
    queryKey: ["search", "pizza", localStorage.getItem("token") as string],
    queryFn: fetchSearch,
  });

  if (queryData.isLoading) {
    return <Spinner />;
  }
  const response = queryData?.data ?? [];
  return (
    <div className={styles.container}>
      <>
        {response ? (
          response.map((item, index) => (
            <SmallCard key={index}>
              <div className={styles.smallCard}>
                <div className={styles.img}>
                  <img src={item.image} />
                  <p>{item.name}</p>
                </div>
              </div>
            </SmallCard>
          ))
        ) : (
          <p>no data</p>
        )}
      </>
    </div>
  );
}
