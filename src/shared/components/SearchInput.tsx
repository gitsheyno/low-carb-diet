import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { InputAdornment, TextField } from "@mui/material";
import { Search as SearchIcon } from "lucide-react";
export default function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<string>(() => searchParams.get("q") ?? "");

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmedQuery = query.trim();
      setSearchParams(trimmedQuery ? { q: trimmedQuery } : {}, {
        replace: true,
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [query, setSearchParams]);
  return (
    <TextField
      className="search-field"
      fullWidth
      id="recipe-search"
      label="Search meals and recipes"
      onChange={handleQuery}
      value={query}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="#69766e" size={18} />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
