import { Box, Typography, Breadcrumbs } from "@mui/material";
import React from "react";

import Layout from "../components/dashboard/layouts";

const Index = () => {
  return (
    <Layout>
      <Box>
        <Grid container width={"100%"} height={"100%"}>
          <Grid item md={3}>
            <Typography>Dashboard</Typography>
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{
                mt: 2,
                backgroundColor: "#295ad6",
                p: 1.5,
                borderRadius: 1,
                color: "#fff",
              }}
            >
              <Link underline="hover" color="inherit" href="/dashboard">
                Dashboard
              </Link>
            </Breadcrumbs>
            <Box></Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Index;
