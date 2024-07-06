import searchStyle from "../components/Dashboard.module.css";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
export default function Search() {
  const [query, setQuery] = useState<string>("");
  const setSearchParam = useSearchParams();

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParam[1]({ q: query });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);
  return (
    <div className={searchStyle.search}>
      <input
        type="text"
        placeholder="Search your Recipe..."
        name="query"
        value={query}
        onChange={handleQuery}
      />
    </div>
  );
}
