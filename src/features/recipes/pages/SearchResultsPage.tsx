import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import searchRecipes from "../api/searchRecipes";
export default function SearchResultsPage() {
  const { id } = useParams();

  const queryData = useQuery({
    queryKey: ["search", id as string, localStorage.getItem("token") as string],
    queryFn: searchRecipes,
  });
  const response = queryData?.data ?? [];
  console.log(response);
  return <div>{/* <NewRecipes response={response} /> */}</div>;
}
