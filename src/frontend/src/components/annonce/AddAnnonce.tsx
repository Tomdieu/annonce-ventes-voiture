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
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Save, Restore, Close } from "@mui/icons-material";
import { Helmet } from "react-helmet";

import Map, {
  Marker,
  NavigationControl,
  GeolocateControl,
  MapRef,
} from "react-map-gl";
import { Formik, Form } from "formik";

import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import axios from "axios";
import createAnnonceSchema from "../../schema/createAnnonceSchema";
import { LocationTypes, VoitureTypes } from "../../types/";
import { useAuth } from "../../context/AuthContext";
import ApiService from "../../utils/ApiService";

import { useStyles } from "./styles";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  open: boolean;
  onClose: (value: boolean) => void;
  onCreate: (data: any) => void;
};
type FormDataState = { [key: string]: FormDataEntryValue | number };

const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_KEY;

const viewport = {
  width: 500,
  height: 400,
  latitude: 0,
  longitude: 0,
  zoom: 3,
};

const SingletonAddAnnonce = (props: Props) => {
  const { open, onClose, onCreate } = props;
  const fullWidth: boolean = true;
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
  };

  useEffect(() => {
    if (annonceLocation) {
      mapRef.current?.flyTo({
        center: [annonceLocation.longitude, annonceLocation.latitude],
        duration: 2000,
        zoom: 14,
      });
    }
  }, [annonceLocation]);

  useEffect(() => {
    if (userToken) {
      ApiService.listVoiture(userToken)
        .then((res) => res.json())
        .then((data) => setVoitures(data))
        .catch((err) => console.log(err));
    }
  }, [userToken]);

  useEffect(() => {
    if (
      annonceLocation &&
      annonceLocation.latitude !== 0 &&
      annonceLocation.longitude !== 0
    ) {
      const { longitude, latitude } = annonceLocation;
      const getPlaceName = async () => {
        try {
          const response = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=aedf3186d09b474abd1a8808eaf0bcc1`
          );
          const { formatted } = response.data.features[0].properties;
          setSearchTerm(formatted);
        } catch (error) {
          console.error(error);
        }
      };

      getPlaceName();
    }
  }, [annonceLocation]);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setAnnonceLocation({ ...annonceLocation, latitude, longitude });
          },
          (error) => {
            console.log(error.message);
          }
        );
      } else {
        console.log("Geolocation is not supported by your browser.");
      }
    };

    getLocation();
  }, []);

  const handleSearch = async (event: React.SyntheticEvent<Element, Event>) => {
    const value = event.target.value;
    setSearchTerm(value);

    try {
      if (value.length >= 3) {
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&limit=5&apiKey=aedf3186d09b474abd1a8808eaf0bcc1`
        );
        const data: LocationTypes[] = response.data.features.map(
          (feature: {
            properties: { formatted: any; lat: any; lon: any };
          }) => ({
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
  };

  const geolocateControlRef = React.useCallback(
    (ref: { trigger: () => void }) => {
      if (ref) {
        // Activate as soon as the control is loaded
        ref.trigger();
      }
    },
    []
  );

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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard | Annonce </title>
      </Helmet>
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
          voiture: null,
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

              for (let [name, value] of formData.entries()) {
                if(name==="prix"){
                  jsonData[name] = parseInt(value.toString())
                }
                else{

                  jsonData[name] = value;
                }
              }

              jsonData["latitude"] = annonceLocation.latitude;
              jsonData["longitude"] = annonceLocation.longitude;

              const jsonString = JSON.stringify(jsonData);
            
              ApiService.createAnnonce(jsonString, userToken)
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  handleReset(e);
                })
                .catch((err) => {
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
                  helperText={touched.titre && errors.titre}
                  fullWidth
                />

                <TextField
                  label="Voiture"
                  name="voiture"
                  value={values.voiture}
                  onChange={handleChange("voiture")}
                  onBlur={handleBlur("voiture")}
                  error={Boolean(touched.voiture && errors.voiture)}
                  helperText={touched.voiture && errors.voiture}
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
                  helperText={touched.prix && errors.prix}
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
                  helperText={touched.description && errors.description}
                  fullWidth
                />
                <Autocomplete
                  freeSolo
                  options={options}
                  getOptionLabel={(option: { label: string }) => option.label}
                  inputValue={searchTerm}
                  onInputChange={(
                    e: React.SyntheticEvent<Element, Event>,
                    v: any,
                    r: any
                  ) => {
                    handleSearch(e);
                  }}
                  onChange={(
                    e: React.SyntheticEvent<Element, Event>,
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
                    helperText={touched.latitude && errors.latitude}
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
                    helperText={touched.longitude && errors.longitude}
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
                    Reset
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
                    Save
                  </Button>
                </Box>
              </Grid>
              <Grid md={5} sm={12} xs={12} item component={Paper}>
                <Map
                  ref={mapRef}
                  initialViewState={viewport}
                  style={{ width: "100%", height: 500 }}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                  mapboxAccessToken="pk.eyJ1IjoiaXZhbnRvbSIsImEiOiJjbDJnMGlwNnYwZm9zM2duYnQ0a3c2bXFvIn0.x29uaFl79xgLW6nCs15JWw"
                >
                  <NavigationControl />
                  <GeolocateControl
                    showAccuracyCircle
                    showUserLocation
                    ref={geolocateControlRef}
                    onGeolocate={(e) =>
                      setAnnonceLocation({
                        ...annonceLocation,
                        longitude: e.coords.longitude,
                        latitude: e.coords.latitude,
                      })
                    }
                  />
                  <Marker
                    onDragEnd={(e) =>
                      setAnnonceLocation({
                        ...annonceLocation,
                        latitude: e.lngLat.lat,
                        longitude: e.lngLat.lng,
                      })
                    }
                    onDragStart={(e) => {}}
                    draggable
                    longitude={annonceLocation.longitude}
                    latitude={annonceLocation.latitude}
                    anchor="bottom"
                  />
                </Map>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

const AddAnnonce = (props: Props) => <SingletonAddAnnonce {...props} />;

export default (props: Props) => <AddAnnonce {...props} />;
