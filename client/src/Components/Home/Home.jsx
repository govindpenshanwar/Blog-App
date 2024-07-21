import React, { useState } from "react";
import Categories from "./Categories";
import { TextField, InputAdornment } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import Cards from "../Card/Cards";
import temp from '../Assets/temp.png'

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="p-2 mt-14 flex flex-col gap-2  ">
      <div className=" py-4 flex items-center justify-center">
        <img src={temp} alt="hero img " className="md:w-3/6 w-5/6" />
      </div>
      <div className="flex sm:flex-row flex-col sm:gap-5 gap-8  items-center justify-between p-2">
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


      <Cards searchQuery={searchQuery} />
    </div>
  );
}

export default Home;
