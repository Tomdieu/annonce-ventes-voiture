import { Box, Typography,Grid } from '@mui/material'
import React from 'react'

import Layout from "../../components/dashboard/layouts"

const Dashboard = () => {
  return (
    <Layout>
      <Box width={"100%"} height={"100%"}>
      <Grid container width={'100%'} height={'100%'}>
        <Grid item md={3}>
          <Typography>Dashboard</Typography>
        </Grid>
      </Grid>
      </Box>
    </Layout>
  )
}

export default Dashboard
