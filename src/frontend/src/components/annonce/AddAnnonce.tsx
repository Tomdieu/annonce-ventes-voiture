/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Dialog,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Autocomplete,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  ButtonBase,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  Save,
  Restore,
  Close,
  LocationDisabledRounded,
  MyLocationRounded,
} from "@mui/icons-material";

import Map, {
  Marker,
  NavigationControl,
  GeolocateControl,
  MapRef,
} from "react-map-gl";
import { Formik, Form } from "formik";
import React from "react";
import axios from "axios";
import createAnnonceSchema from "../../schema/createAnnonceSchema";
import {
  LocationTypes,
  VoitureTypes,
  AnnonceTypes,
  GeoapifyResponse,
  FetchError,
} from "../../types/";
import { useAuth } from "../../context/AuthContext";
import ApiService from "../../utils/ApiService";
import Transition from "../Transition";
import { useStyles } from "./styles";

type Props = {
  open: boolean;
  onClose: (value: boolean) => void;
  onCreate: (data: AnnonceTypes) => void;
};
type FormDataState = { [key: string]: FormDataEntryValue | number };

const viewport = {
  width: 500,
  height: 400,
  latitude: 0,
  longitude: 0,
  zoom: 3,
};

const AddAnnonce = (props: Props) => {
  const { open, onClose, onCreate } = props;
  const fullWidth = true;
  const classes = useStyles();
  const maxWidth = "lg";
  const mapRef = useRef<MapRef>();
  const { userToken } = useAuth();
  const [annonceLocation, setAnnonceLocation] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 2,
  });

  const [voiture, setVoitures] = useState<VoitureTypes[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState<LocationTypes[]>([]);

  const handleClose = () => {
    onClose(false);
    setSearchTerm("");
    setAnnonceLocation({
      longitude: 0,
      latitude: 0,
      zoom: 2,
    });
  };

  useEffect(() => {
    if (annonceLocation.latitude !== 0 && annonceLocation.longitude !== 0) {
      mapRef.current?.flyTo({
        center: [annonceLocation.longitude, annonceLocation.latitude],
        duration: 500,
        zoom: 14,
      });
    }
  }, [annonceLocation]);

  useEffect(() => {
    if (userToken) {
      ApiService.listVoiture(userToken)
        .then((res) => res.json())
        .then((data: VoitureTypes[]) => setVoitures(data))
        .catch((err) => console.log(err));
    }
  }, [userToken]);

  // useEffect(() => {
  //   const getLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           const { latitude, longitude } = position.coords;
  //           setAnnonceLocation({ ...annonceLocation, latitude, longitude });
  //         },
  //         (error) => {
  //           console.log(error.message);
  //         }
  //       );
  //     } else {
  //       console.log("Geolocation is not supported by your browser.");
  //     }
  //   };

  //   getLocation();
  // }, [annonceLocation]);

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    if (value) {
      try {
        if (value.length >= 3) {
          const response = await axios.get<GeoapifyResponse>(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&limit=5&apiKey=aedf3186d09b474abd1a8808eaf0bcc1`
          );
          const data: LocationTypes[] = response.data.features.map(
            (feature) => ({
              label: feature.properties.formatted,
              latitude: feature.properties.lat,
              longitude: feature.properties.lon,
            })
          );
          setOptions(data);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setAnnonceLocation({
        longitude: 0,
        latitude: 0,
        zoom: 2,
      });
    }
  };

  useEffect(() => {
    if (
      annonceLocation &&
      annonceLocation.latitude !== 0 &&
      annonceLocation.longitude !== 0
    ) {
      const { longitude, latitude } = annonceLocation;
      const getPlaceName = async () => {
        try {
          const response = await axios.get<GeoapifyResponse>(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=aedf3186d09b474abd1a8808eaf0bcc1`
          );
          const { formatted } = response.data.features[0].properties;
          setSearchTerm(formatted);
        } catch (error) {
          console.error(error);
        }
      };

      getPlaceName().catch((err) => console.log(err));
    }
  }, [annonceLocation]);

  const [isTrackingUser, setIsTrackingUser] = React.useState(false);

  const handleGeolocateClick = () => {
    setIsTrackingUser(true);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      className={classes.dialog}
    >
      <Box sx={{ m: 2 }}>
        <IconButton onClick={() => onClose(false)} sx={{ borderRadius: 2 }}>
          <Close />
        </IconButton>
      </Box>
      <Formik
        initialValues={{
          titre: "",
          description: "",
          prix: 0,
          voiture: "",
          latitude: 0.0,
          longitude: 0.0,
          address: "",
        }}
        validationSchema={createAnnonceSchema}
        onSubmit={console.log}
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          isValid,
          handleReset,
        }) => (
          <Form
            method="post"
            onSubmit={(e) => {
              e.preventDefault();

              const formData = new FormData(e.currentTarget);
              const jsonData: FormDataState = {};

              for (const [name, value] of formData.entries()) {
                if (name === "prix") {
                  jsonData[name] = parseInt(value.toString());
                } else {
                  jsonData[name] = value;
                }
              }

              jsonData["latitude"] = annonceLocation.latitude;
              jsonData["longitude"] = annonceLocation.longitude;

              const jsonString = JSON.stringify(jsonData);

              ApiService.createAnnonce(jsonString, userToken)
                .then((res) => res.json())
                .then((data: AnnonceTypes) => {
                  console.log(data);
                  onCreate(data);
                  handleReset(e);
                })
                .catch((err: FetchError) => {
                  console.log(err.message);
                  console.log(err);
                })
                .finally(() => onClose(false));
            }}
          >
            <Typography
              variant="h2"
              textAlign="center"
              sx={{ fontSize: "3rem" }}
            >
              Cree une annonce
            </Typography>
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                flexDirection: "row",
                width: "100%",
                // height:"100%",
                mt: 5,
              }}
              container
              p={3}
            >
              <Grid
                md={5}
                sm={12}
                xs={12}
                item
                sx={{
                  display: "flex",
                  gap: 1,
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
                component={Paper}
                p={1}
              >
                <TextField
                  label="Titre"
                  name="titre"
                  value={values.titre}
                  onChange={handleChange("titre")}
                  onBlur={handleBlur("titre")}
                  error={Boolean(touched.titre && errors.titre)}
                  helperText={touched.titre && errors.titre.toString()}
                  fullWidth
                />

                <TextField
                  label="Voiture"
                  name="voiture"
                  value={values.voiture}
                  onChange={handleChange("voiture")}
                  onBlur={handleBlur("voiture")}
                  error={Boolean(touched.voiture && errors.voiture)}
                  helperText={touched.voiture && errors.voiture.toString()}
                  fullWidth
                  select
                >
                  {voiture?.map((voiture) => (
                    <MenuItem value={voiture.id} key={voiture.id}>
                      {voiture.model.marque?.nom} {voiture.model.nom}{" "}
                      {voiture.type_carburant} {voiture.annee}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Prix"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">XAF</InputAdornment>
                    ),
                  }}
                  name="prix"
                  type="number"
                  value={values.prix}
                  onChange={handleChange("prix")}
                  onBlur={handleBlur("prix")}
                  error={Boolean(touched.prix && errors.prix)}
                  helperText={touched.prix && errors.prix.toString()}
                  fullWidth
                />
                <TextField
                  label="Description"
                  multiline
                  rows={4}
                  name="description"
                  value={values.description}
                  onChange={handleChange("description")}
                  onBlur={handleBlur("description")}
                  error={Boolean(touched.description && errors.description)}
                  helperText={
                    touched.description && errors.description.toString()
                  }
                  fullWidth
                />
                <Autocomplete
                  freeSolo
                  options={options}
                  getOptionLabel={(option: { label: string }) => option.label}
                  inputValue={searchTerm}
                  onInputChange={(
                    _e: React.SyntheticEvent<Element, Event>,
                    value: string
                  ) => {
                    handleSearch(value).catch((err) => console.log(err));
                  }}
                  onChange={(
                    _e: React.SyntheticEvent<Element, Event>,
                    value: LocationTypes
                  ) => {
                    setSearchTerm(value ? value.label : "");
                    setAnnonceLocation({
                      ...annonceLocation,
                      longitude: value.longitude,
                      latitude: value.latitude,
                    });
                  }}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="address"
                      label="Address"
                      variant="outlined"
                    />
                  )}
                />
                {/* <TextField label="Address" fullWidth /> */}
                <Box style={{ width: "100%", display: "flex", gap: 5 }}>
                  <TextField
                    label="Latitude"
                    name="latitude"
                    value={annonceLocation.latitude}
                    disabled
                    fullWidth
                    onChange={handleChange("latitude")}
                    onBlur={handleBlur("latitude")}
                    error={Boolean(touched.latitude && errors.latitude)}
                    helperText={
                      Boolean(touched.latitude) && errors.latitude.toString()
                    }
                  />
                  <TextField
                    label="Longitude"
                    name="longitude"
                    value={annonceLocation.longitude}
                    disabled
                    fullWidth
                    onChange={handleChange("longitude")}
                    onBlur={handleBlur("longitude")}
                    error={Boolean(touched.longitude && errors.longitude)}
                    helperText={
                      touched.longitude && errors.longitude.toString()
                    }
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Button
                    startIcon={<Restore />}
                    size="large"
                    color="error"
                    variant="contained"
                    type="reset"
                  >
                    Renitailiser
                  </Button>
                  <Button
                    startIcon={<Save />}
                    size="large"
                    color="success"
                    variant="contained"
                    type="submit"
                    // onClick={handleSubmit}
                    disabled={
                      (!isValid && searchTerm === "") ||
                      annonceLocation.latitude === 0 ||
                      annonceLocation.longitude === 0
                    }
                  >
                    Cree
                  </Button>
                </Box>
              </Grid>
              <Grid
                md={5}
                sm={12}
                xs={12}
                item
                component={Paper}
                sx={{ position: "relative" }}
              >
                <Box
                  sx={{ position: "absolute", top: 8, left: 8, zIndex: 999 }}
                >
                  <ButtonBase
                    sx={{ borderRadius: 2 }}
                    onClick={() => setIsTrackingUser(!isTrackingUser)}
                  >
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 2,
                        backgroundColor: "rgba(255,255,255,1)",
                        border: "1px solid #ddd",
                      }}
                    >
                      {!isTrackingUser ? (
                        <LocationDisabledRounded />
                      ) : (
                        <MyLocationRounded />
                      )}
                    </Box>
                  </ButtonBase>
                </Box>
                <Map
                  ref={mapRef}
                  initialViewState={viewport}
                  style={{ width: "100%", height: 500 }}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                  mapboxAccessToken="pk.eyJ1IjoiaXZhbnRvbSIsImEiOiJjbDJnMGlwNnYwZm9zM2duYnQ0a3c2bXFvIn0.x29uaFl79xgLW6nCs15JWw"
                >
                  <NavigationControl />
                  <GeolocateControl
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={isTrackingUser} // Set to true when the user has clicked the icon
                    showUserLocation={isTrackingUser}
                    onGeolocate={(e) => {
                      handleGeolocateClick();
                      setAnnonceLocation({
                        ...annonceLocation,
                        longitude: e.coords.longitude,
                        latitude: e.coords.latitude,
                      });
                      
                    }}
                  />
                  <Marker
                    onDragEnd={(e) =>
                      setAnnonceLocation({
                        ...annonceLocation,
                        latitude: e.lngLat.lat,
                        longitude: e.lngLat.lng,
                      })
                    }
                    draggable
                    longitude={annonceLocation.longitude}
                    latitude={annonceLocation.latitude}
                    anchor="bottom"
                  />
                  {/* {annonceLocation.latitude !== 0 && annonceLocation.longitude!==0 && (
                    
                  )} */}
                </Map>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddAnnonce;
