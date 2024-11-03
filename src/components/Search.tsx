import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";
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
    <Box sx={{ width: "100%", maxWidth: "100%" }}>
      <TextField
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleQuery(event);
        }}
        fullWidth
        label="Search"
        id="fullWidth"
      />
    </Box>
  );
}
