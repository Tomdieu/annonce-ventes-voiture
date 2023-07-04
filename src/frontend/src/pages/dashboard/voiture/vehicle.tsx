import React from "react";
import Layout from "../../../components/dashboard/layouts";
import { Box, Grid, Typography, CircularProgress, CardMedia, IconButton, Paper } from "@mui/material";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import ApiService from "../../../utils/ApiService";
import { VoitureTypes } from "../../../types";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const VoitureView = () => {
  const { id } = useParams();
  const [vehicule, setVehicule] = useState<VoitureTypes>();
  const { userToken } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (userToken && id) {
      ApiService.getVoiture(parseInt(id), userToken)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setVehicule(data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [userToken, id]);
  return (
    <Layout>
      <Box
        sx={{
          padding: 0,
          margin: 0,
          backgroundColor: "RGBA(226, 254, 254,.2)",
        }}
        width={"100%"}
        height={"100%"}
      >
        <Helmet>
          <meta charSet="utf-8" />
          <title>Dashboard | Voiture </title>
        </Helmet>
        <Grid container width={"100%"} height={"100%"} sx={{backgroundColor:"#79c2e29e"}}>
          {loading && !vehicule ? (
            <CircularProgress size={""}/>
          ) : (
            <>
              <Grid item md={9} sm={7} xs={12} sx={{ backgroundColor: "#fff", p: 1 }}>
                <Box sx={{position:"relative",p:2,backgroundColor:"#3ac2e494",borderRadius:5}}>
                  <Box sx={{position:"absolute",left:0,top:"45%"}}>
                    <Paper sx={{borderRadius:8}}>
                    <IconButton>
                      <ArrowBack/>
                    </IconButton>
                    </Paper>
                  </Box>
                  <CardMedia
                  sx={{
                    height: 500,
                  }}
                    image={vehicule.images[0].photo}
                    title={vehicule.model.nom}
                  />
                  <Box sx={{position:"absolute",right:0,top:"45%"}}>
                  <Paper sx={{borderRadius:8}}>
                    <IconButton>
                      <ArrowForward/>
                    </IconButton>
                    </Paper>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                md={3}
                sm={5}
                sx={{ backgroundColor: "#dedede", p: 2 }}
              >
                <Box display={"flex"} columnGap={3} rowGap={3} flexDirection={"column"}>
                  <Typography variant="h6">Annee : {vehicule.annee}</Typography>
                  <Typography variant="h6">
                    Marque : {vehicule.model.marque?.nom}{" "}
                  </Typography>
                  <Typography variant="h6">Modele : {vehicule.model.nom} </Typography>
                  <Typography variant="h6">Type Vehicule : {vehicule.type_vehicule} </Typography>

                  <Typography variant="h6">
                    # D'imatriculation : {vehicule.plaque_immatriculation}
                  </Typography>
                  <Typography variant="h6"># Place : {vehicule.nombre_de_place}</Typography>
                  <Box display={"flex"} gap={1} alignItems={"center"}>

                  <Typography variant="h6">Couleur : {vehicule.couleur} </Typography>
                  <Box component={'span'} sx={{width: '20px', height: '20px', backgroundColor: `${ vehicule.couleur }`,borderRadius:8}}></Box>
                  </Box>
                  <Typography variant="h6">Boite Vitesse : {vehicule.boite_vitesse}</Typography>
                  <Typography variant="h6">Type Moteur : {vehicule.type_carburant}</Typography>
                  
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Layout>
  );
};

export default VoitureView;
