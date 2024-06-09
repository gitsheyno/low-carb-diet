import searchStyle from "../components/Search.module.css";
import { useSearchParams } from "react-router-dom";
export default function Search() {
  const setSearchParam = useSearchParams();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const queryStr = formData.get("query")?.toString() ?? "";
          setSearchParam[1]({ q: queryStr });
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
    </>
  );
}
