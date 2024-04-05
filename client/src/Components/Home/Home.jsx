import React from 'react'
import Categories from './Categories'
import { Grid } from '@mui/material'
import Cards from '../Card/Cards'



function Home() {

  return (
    <>
      {/* <Banner /> */}
      <Grid container className='container mt-20 '>
        <Grid item lg={2} sm={2} xs={6}>
          <Categories />
        </Grid>
        <Grid container item xs={12} sm={10} lg={10}>
          <Cards />
        </Grid>
      </Grid>

    </>

  )
}

export default Home