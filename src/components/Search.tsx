import { useState } from "react";
import { Navigate } from "react-router-dom";
import searchStyle from "../components/Search.module.css";

export default function Search() {
  const [query, setQuery] = useState<string>("");
  //   const queryData = useQuery({
  //     queryKey: ["search", query, localStorage.getItem("token") as string],
  //     queryFn: fetchSearch,
  //   });

  //   const response = queryData?.data ?? [];
  //   console.log(response);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const queryStr = formData.get("query")?.toString() ?? "";
          setQuery(queryStr);
        }}
        className={searchStyle.searchContainer}
      >
        <div className={searchStyle.search}>
          <input type="text" placeholder="Search your Recipe..." name="query" />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
      {query && <Navigate to={`/Recipes/${query}`} />}
    </>
  );
}
