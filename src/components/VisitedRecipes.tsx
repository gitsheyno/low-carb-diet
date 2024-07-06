import styles from "./Dashboard.module.css";
import type { Meal } from "../utils/fetchMeals";
import Banner from "./Banner";

export default function VisitedRecipes({ response }: { response: Meal[] }) {
  // const queryData = useQuery({
  //   queryKey: ["search", "pizza", localStorage.getItem("token") as string],
  //   queryFn: fetchSearch,
  // });

  // if (queryData.isLoading) {
  //   return <Spinner />;
  // }
  // const response = queryData?.data ?? [];
  return (
    <div className={styles.visited}>
      {response ? (
        <>
          {response.map((item) => (
            <Banner key={item.id} data={item} />
          ))}
        </>
      ) : (
        <p>no Meals Found</p>
      )}
    </div>
  );
}
