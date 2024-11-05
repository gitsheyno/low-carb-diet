import styles from "./Dashboard.module.css";
import { Link, useParams } from "react-router-dom";
import type { Meal } from "../utils/fetchMeals";

export default function DailyMeals({ response }: { response: Meal[] }) {
  const { user } = useParams();
  return (
    <div className={styles.dailyMeals}>
      {response.length ? (
        <>
          <ul className={styles.dailyMealsLists}>
            {response.map((item) => {
              const date = new Date(response[0].createdAT as string);
              const day = date.getDate();
              const month = date.toLocaleString("default", { month: "short" });
              return (
                <li key={item.id}>
                  <div className={styles.list}>
                    <div className={styles.innerBox}>
                      <div className={styles.img}>
                        <img src={item.image} />
                      </div>

                      <Link to={`/dashboard/${user}/recipe/${item.id}`}>
                        {item.name}
                      </Link>
                    </div>
                    <p className={styles.status}>
                      Status : <span style={{ color: "green" }}>Completed</span>
                    </p>
                  </div>
                  <div className={styles.moreInfo}>
                    <p className={styles.total}>
                      🍽️ {Math.round(item.calories)} cal
                    </p>
                    <p className={styles.date}>🗓️ {`${day} / ${month}`}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p style={{ textAlign: "center" }}>no meals found</p>
      )}
    </div>
  );
}
