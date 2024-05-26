import React, { useState } from "react";
import Categories from "./Categories";
import { TextField, InputAdornment } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import Cards from "../Card/Cards";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="p-2 mt-14 flex flex-col gap-2  ">
      <div
        className="flex sm:flex-row flex-col sm:gap-5 gap-8  items-center justify-between p-2"

      >
        <Categories />
        <TextField
          className="w-80"
          placeholder="Search Category"
          variant="standard"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onMouseDown={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchSharpIcon fontSize="medium" />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className="grid sm:grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 md:gap-10  lg:gap-5 grid-cols-1 px-8 place-items-center justify-center ">
        <Cards searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export default Home;
