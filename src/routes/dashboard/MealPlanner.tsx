import { useEffect, useState } from "react";
import Input from "../../components/custom/Input";
import styles from "../../components/Dashboard.module.css";
import Search from "../../components/Search";
import NewRecipes from "../../components/NewRecipes";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "../../utils/fetchSearch";
import Spinner from "../../components/Spinner";
export default function MealPlanner() {
  const searchParams = useSearchParams();
  const queryData = useQuery({
    queryKey: [
      "search",
      (searchParams[0].get("q") as string) || "",
      localStorage.getItem("token") as string,
    ],
    queryFn: fetchSearch,
  });

  console.log(queryData.data);

  if (queryData.isLoading) {
    return <Spinner />;
  }
  const response = queryData?.data ?? [];
  return (
    <div className={styles.mealPlaner}>
      {/* <Input name={"salam"} /> */}
      <Search />
      {response ? (
        <>{/* <NewRecipes response={response} /> */}</>
      ) : (
        <p>no data</p>
      )}
    </div>
  );
}
