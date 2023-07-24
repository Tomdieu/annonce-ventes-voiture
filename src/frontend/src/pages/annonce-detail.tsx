import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import ApiService from "../utils/ApiService";
import { AnnonceTypes } from "../types";
import {
  Box,
  Grid,
  Typography,
  Container,
  Divider,
  ButtonBaseProps,
  ButtonBase,
  Theme,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/loading";
import { Call } from "@mui/icons-material";
import Slider, { Settings } from "react-slick";
import { NextArrow, PrevArrow } from "../components/Arrows";
import { TYPE_TRACTION } from "../components/voiture/data";
import Annonce from "../components/annonce/Annonce";
import mapboxgl from "mapbox-gl";
import Map, { MapRef, Marker, NavigationControl } from "react-map-gl";
import { makeStyles } from "@mui/styles";
import { Helmet } from "react-helmet-async";

const useStyles = makeStyles((theme: Theme) => ({
  glassContainer: {
    background: "rgba(255, 255, 255, 0.25)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(4px)",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    padding: theme.spacing(2),
  },
}));

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <PrevArrow />, // Display previous arrow
  nextArrow: <NextArrow />, // Display next arrow
};

type ContactBtnProps = {
  phone: string;
} & ButtonBaseProps;

const ContactBtn = (props: ContactBtnProps) => {
  const { phone, sx, ...others } = props;
  const [hidePhone,setHidePhone] = useState(true)
  return (
    <ButtonBase {...others} sx={{ ...sx, borderRadius: 8 }} onClick={()=>setHidePhone(!hidePhone)}>
      <Box
        sx={{
          display: "flex",
          padding: 1,
          gap: 1,
          alignItems: "center",
          backgroundColor: "#ccc",
          borderRadius: 8,
          "&:hover": {
            "& .contact": {
              color: "#fff",
            },
            backgroundColor: "RGB(49, 114, 221)",
          },
        }}
      >
        <Call className="contact" />{" "}
        <Typography className="contact" sx={{fontSize:"1rem",mr:.5}}>{hidePhone?"Contactez":phone}</Typography>
      </Box>
    </ButtonBase>
  );
};

const AnnonceDetailPage = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [annonce, setAnnonce] = useState<AnnonceTypes>();
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<MapRef>();
  const [viewport, setViewPort] = useState({
    width: 500,
    height: 400,
    latitude: 0,
    longitude: 0,
    zoom: 11,
  });
  const markerRef = useRef<mapboxgl.Marker>();

  const popup = useMemo(() => {
    if (annonce) {
      return new mapboxgl.Popup().setText(annonce.address);
    }
  }, [annonce]);

  const togglePopup = useCallback(() => {
    markerRef.current?.togglePopup();
  }, []);

  useEffect(() => {
    ApiService.getAnnonces(Number(id))
      .then((res) => res.json())
      .then((data: AnnonceTypes) => {
        setAnnonce(data);
        setViewPort({
          ...viewport,
          latitude: data.latitude,
          longitude: data.longitude,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading === false) {
      if (annonce) {
        mapRef.current?.flyTo({
          center: [annonce.longitude, annonce.latitude],
          duration: 2000,
          zoom: 14,
        });
      }
    }
  }, [annonce, loading, viewport]);

  const capitalizeFirstLetter = useCallback((word: string) => {
    if (typeof word !== "string" || word.length === 0) {
      return "";
    }

    return word.charAt(0).toUpperCase() + word.slice(1);
  }, []);

  const getTraction = useCallback((traction: string) => {
    return TYPE_TRACTION.find((trac) => trac.value === traction).label;
  }, []);

  return (
    <Box sx={{ width: "100vw", height: "100vh", overflowX: "hidden" }}>
      <Box sx={{ position: "relative", mb: 8 }}>
        <Header />
      </Box>
      {loading && <Loading height={"80vh"} />}
      {!loading && annonce && (
        <Box sx={{}}>
          <Helmet>
        <title>{annonce?.voiture.model.marque.nom} - {annonce?.voiture.model.nom}</title>
        <meta name="description" content={annonce?.description} />
        {/* Open Graph (OG) meta tags */}
        <meta property="og:title" content={`${annonce?.voiture.model.marque.nom} - ${annonce?.voiture.model.nom}`} />
        <meta property="og:description" content={annonce?.description} />
        {/* Add an image URL for the og:image tag */}
        <meta property="og:image" content={annonce?.voiture.images[0].photo} />
        {/* Add the URL of the page for the og:url tag */}
        <meta property="og:url" content="https://django-annonce-ventes.onrender.com" />

        {/* Twitter Card meta tags (Optional, for Twitter sharing) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${annonce?.voiture.model.marque.nom} - ${annonce?.voiture.model.nom}`} />
        <meta name="twitter:description" content={annonce?.description} />
        {/* Add a Twitter image URL for the twitter:image tag */}
        <meta name="twitter:image" content={annonce?.voiture.images[0].photo} />
      </Helmet>
          <Grid container width={"100%"}>
            <Grid item md={8} xs={12} sm={12}>
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
                <Grid container gap={3} sx={{ mt: 3, p: 2 }}>
                  <Grid item xs={12} sm={5} lg={5} className={classes.glassContainer}>
                    <Typography>
                      Marque : {annonce.voiture.model.marque.nom}
                    </Typography>
                    <Typography>
                      Modele : {annonce.voiture.model.nom}
                    </Typography>
                    <Typography>Annee : {annonce.voiture.annee}</Typography>
                    <Typography>
                      Type : {annonce.voiture.type_vehicule}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={5} lg={5} className={classes.glassContainer}>
                    <Typography>Prix : {annonce.prix} FCFA</Typography>
                    <Typography>
                      # Cheveaux : {annonce.voiture.nombre_de_chevaux}
                    </Typography>
                    <Typography>
                      # Place : {annonce.voiture.nombre_de_place}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={5} lg={5} className={classes.glassContainer}>
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
                      {capitalizeFirstLetter(
                        getTraction(annonce.voiture.traction)
                      )}{" "}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12} sm={5}
                    lg={5}
                    columns={2}
                    className={classes.glassContainer}
                  >
                    <Box>
                      <Typography>Description</Typography>
                      <Typography>{annonce.description}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={5} lg={5} className={classes.glassContainer}>
                    <Typography>
                      Proprietaire : {annonce.voiture.proprietaire.username}
                    </Typography>
                    <Typography>Address : {annonce.address}</Typography>

                    <Typography gutterBottom>Tel :</Typography>
                    <Box display={"flex"} alignItems={"center"} gap={2} flexWrap={"wrap"}>
                      <ContactBtn
                        phone={annonce.voiture.proprietaire.phone_1}
                      />
                      <ContactBtn
                        phone={annonce.voiture.proprietaire.phone_1}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Grid>
            <Grid item md={3.5} xs={0} sm={0}>
              <Map
                ref={mapRef}
                initialViewState={viewport}
                style={{
                  width: "100%",
                  height: 500,
                  borderRadius: 8,
                  marginTop: 20,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken="pk.eyJ1IjoiaXZhbnRvbSIsImEiOiJjbDJnMGlwNnYwZm9zM2duYnQ0a3c2bXFvIn0.x29uaFl79xgLW6nCs15JWw"
              >
                <NavigationControl />

                <Marker
                  longitude={annonce.longitude}
                  latitude={annonce.latitude}
                  anchor="bottom"
                  popup={popup}
                  onClick={togglePopup}
                />
              </Map>
            </Grid>
          </Grid>
          <Box sx={{ m: 5 }}>
            <Divider />
          </Box>
          <Box sx={{ ml: 3, mr: 3, p: 4 }}>
            <Typography variant="h4" gutterBottom>
              Voiture Similaire
            </Typography>
            <Grid container spacing={3}>
              {annonce.similar_ads?.map((annonce_similaire) => (
                <Grid item lg={3} key={annonce_similaire.id}>
                  <a href={`/annonces/${annonce_similaire.id}/`}>

                  <Annonce annonce={annonce_similaire} />
                  </a>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}

      <Footer />
    </Box>
  );
};

export default AnnonceDetailPage;
