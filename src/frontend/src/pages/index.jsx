import { Grid, Box, Typography } from "@mui/material";
import React from "react";

const IndexPage = () => {
  return (
    <Grid
      container
      height={"100vh"}
      width={"100vw"}
      maxHeight={"100vh"}
      overflow={"auto"}
      position={"relative"}
      padding={0}
      margin={0}
    >
      <Grid
        item
        md={2.5}
        sm={3}
        lg={2.5}
        xs={2}
        height={"100%"}
        maxHeight={"100vh"}
        overflow={"auto"}
        sx={{
          left: 0,
          bottom: 0,
          top: 0,
          position: "static",
          backgroundColor: "#2e6ee5e6",
          color: "#fff",
        }}
        padding={0}
        margin={0}
      ></Grid>
      <Grid
        item
        md={9.5}
        sm={9}
        lg={9.5}
        xs={10}
        maxHeight={"100vh"}
        overflow={"auto"}
        sx={{ backgroundColor: "#e6f5fee6",p:2 }}
      >
        <Box>
          <Typography>Annonce des voitures</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default IndexPage;
