import { useQuery } from "@tanstack/react-query";
import NewRecipes from "../components/NewRecipes";
import { useParams } from "react-router-dom";
import fetchSearch from "../utils/fetchSearch";
export default function Recipes() {
  const { id } = useParams();

  const queryData = useQuery({
    queryKey: ["search", id as string, localStorage.getItem("token") as string],
    queryFn: fetchSearch,
  });
  const response = queryData?.data ?? [];
  console.log(response);
  return <div>{/* <NewRecipes response={response} /> */}</div>;
}
