import { useParams } from "react-router-dom";
import { useState, useEffect,useCallback } from "react";
import ApiService from "../utils/ApiService";
import { AnnonceTypes } from "../types";
import { Box, Grid, Typography, Container } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/loading";

import Slider, { Settings } from "react-slick";
import { NextArrow, PrevArrow } from "../components/Arrows";
import { TYPE_TRACTION } from "../components/voiture/data";

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <PrevArrow />, // Display previous arrow
  nextArrow: <NextArrow />, // Display next arrow
  className: "xslider",
};

const AnnonceDetailPage = () => {
  const { id } = useParams();
  const [annonce, setAnnonce] = useState<AnnonceTypes>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    ApiService.getAnnonces(Number(id))
      .then((res) => res.json())
      .then((data: AnnonceTypes) => {
        setAnnonce(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  const capitalizeFirstLetter = useCallback((word: string) => {
    if (typeof word !== "string" || word.length === 0) {
      return "";
    }

    return word.charAt(0).toUpperCase() + word.slice(1);
  }, []);

  const getTraction = useCallback((traction:string)=>{
    return TYPE_TRACTION.find((trac)=>trac.value===traction).label 
  },[])

  return (
    <Box sx={{ width: "100vw", height: "100vh", overflowX: "hidden" }}>
      <Box sx={{ position: "relative", mb: 8 }}>
        <Header />
      </Box>
      {loading && <Loading height={"80vh"} />}
      {!loading && annonce && (
        <Box sx={{}}>
          <Grid container width={"100%"}>
            <Grid item md={8}>
              <Container sx={{ p: 5 }}>
                <Box
                  sx={{
                    marginLeft: 2,
                    marginRight: 2,
                    height: "100%",
                  }}
                >
                  <Slider {...settings}>
                    {annonce?.voiture.images?.map((image) => (
                      <Box
                        key={image.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "10px",
                          cursor: "pointer",
                          width: "100%",
                          backgroundColor: "red",
                        }}
                      >
                        <img
                          src={image.photo}
                          alt={annonce.voiture.model.marque.nom}
                          style={{
                            width: "100%",
                            height: "350px",
                            objectFit: "contain",
                          }}
                        />
                      </Box>
                    ))}
                  </Slider>
                </Box>
                <Grid container spacing={3} sx={{ mt: 3 }}>
                  <Grid item xs={12} lg={6}>
                    <Typography>
                      Marque : {annonce.voiture.model.marque.nom}
                    </Typography>
                    <Typography>
                      Modele : {annonce.voiture.model.nom}
                    </Typography>
                    <Typography>Annee : {annonce.voiture.annee}</Typography>
                    <Typography>Type : {annonce.voiture.type_vehicule}</Typography>

                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography>Prix : {annonce.prix} FCFA</Typography>
                    <Typography># Cheveaux : {annonce.voiture.nombre_de_chevaux}</Typography>
                    <Typography># Place : {annonce.voiture.nombre_de_place}</Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography>
                      Motorisation :{" "}
                      {capitalizeFirstLetter(annonce.voiture.type_carburant)}{" "}
                    </Typography>
                    <Typography>
                      Boite Vitesse :{" "}
                      {capitalizeFirstLetter(annonce.voiture.boite_vitesse)}{" "}
                    </Typography>
                    <Typography>
                      Traction :{" "}
                      {capitalizeFirstLetter(getTraction(annonce.voiture.traction))}{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>

                  </Grid>
                  <Grid item xs={12} lg={6}></Grid>

                </Grid>
              </Container>
            </Grid>
            <Grid item md={4}>
              <Typography>XXX</Typography>
            </Grid>
          </Grid>
        </Box>
      )}

      <Footer />
    </Box>
  );
};

export default AnnonceDetailPage;
