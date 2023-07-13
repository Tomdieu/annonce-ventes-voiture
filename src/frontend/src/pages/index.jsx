import { Grid, Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ApiService from "../utils/ApiService";
import Annonce from "../components/annonce/Annonce"
import Filter from "../components/Filter"

const IndexPage = () => {
  const { userToken } = useAuth();
  const [annonces, setAnnonces] = useState([]);
  useEffect(() => {
    if (userToken) {
      ApiService.listAnnonces()
        .then((res) => res.json())
        .then((data) => setAnnonces(data))
        .catch((err) => console.log(err.message));
    }
  }, [userToken]);
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
      >
        <Filter/>
      </Grid>
      <Grid
        item
        md={9.5}
        sm={9}
        lg={9.5}
        xs={10}
        maxHeight={"100vh"}
        overflow={"auto"}
        sx={{ backgroundColor: "#e6f5fee6", p: 2 }}
      >
        <Box flex={1}>
          <Typography
            variant={"h4"}
            sx={{ color: "#2794e7e0", textShadow: "2px 0px 3px #98caf0e0" }}
          >
            Annonce des voitures
          </Typography>
          <Grid container spacing={1} flex={1}>
            {annonces?.map((annonce)=>(
              <Grid item md={3} sm={5} xs={12} key={annonce.id}>
                <Annonce annonce={annonce}/>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default IndexPage;
