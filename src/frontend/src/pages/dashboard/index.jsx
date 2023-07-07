import { Box, Typography, Grid, Breadcrumbs, Link, Paper } from "@mui/material";
import React from "react";

import Layout from "../../components/dashboard/layouts";
import CountNumber from "../../components/CountNumber";
import { Delete } from "@mui/icons-material";

const Dashboard = () => {
  return (
    <Layout>
      <Box width={"100%"} height={"100%"}>
        <Grid container width={"100%"} height={"100%"}>
          <Grid
            item
            md={12}
            xs={12}
            sm={12}
            pl={0}
            pr={0}
            p={0.5}
            height={"100%"}
          >
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{
                backgroundColor: "#295ad6",
                // borderRadius: 1,
                color: "#fff",
                height: "3%",
                padding: 2,
              }}
            >
              <Link underline="hover" color="inherit" href="/dashboard">
                Dashboard
              </Link>
            </Breadcrumbs>
            <Box sx={{ p: 0.5, height: "92.5%" }} component={Paper}>
              <Box sx={{ display: "flex", gap: 3 }}>
                <CountNumber text={"Voitures"} count={5} />
                <CountNumber text={"Annonces"} count={5} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Dashboard;
