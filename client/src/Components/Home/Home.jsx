import React, { useState } from 'react'
import Categories from './Categories'
import { Grid, TextField, InputAdornment } from '@mui/material'
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import Cards from '../Card/Cards'



function Home() {

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    setSearchQuery("");
  }


  return (
    <>
      <div className='mt-20 px-2 w-80 sm:ml-auto md:ml-auto ml-32 mr-6 '>
        <TextField
          placeholder='Search Category'
          variant='standard'
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onMouseDown={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchSharpIcon fontSize='medium' />
              </InputAdornment>
            ),
          }}
        />
      </div>

      {/* <Banner /> */}
      <Grid className='mt-10 px-1 flex flex-row sm:gap-16 gap-10 '>
        {/* <Grid item lg={2} sm={2} xs={4}>
          <Categories />
        </Grid> */}
        {/* <Grid container item xs={12} sm={10} lg={10}>
          <Cards />
        </Grid> */}
        {/* <div className='grid  sm:grid-cols-2 md:grid-cols-1 grid-cols-1 sm:ml-0 ml-20 p-2 '> */}

        <Categories />
        {/* </div> */}
        <div className='grid sm:grid-cols-1 gap-5 sm:pr-0 pr-4 md:grid-cols-2 lg:grid-cols-3 md:gap-8  lg:gap-12 grid-cols-1'
        // className='flex flex-col flex-wrap  sm:flex-row  gap-5 px-8 sm:ml-14'
        >
          <Cards searchQuery={searchQuery} />
        </div>
      </Grid>

    </>

  )
}

export default Home