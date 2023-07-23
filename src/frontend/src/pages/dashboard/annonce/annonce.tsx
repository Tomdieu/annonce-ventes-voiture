import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Autocomplete,
  InputAdornment,
  MenuItem,
  Paper,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Save } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import Map, {
  Marker,
  NavigationControl,
  GeolocateControl,
  MapRef,
} from "react-map-gl";
import { Formik, Form } from "formik";
import Layout from "../../../components/dashboard/layouts";

import React from "react";
import axios from "axios";
import {
  AnnonceTypes,
  LocationTypes,
  VoitureTypes,
  FetchError,
  GeoapifyResponse,
} from "../../../types";
import { useAuth } from "../../../context/AuthContext";
import ApiService from "../../../utils/ApiService";
import { Helmet } from "react-helmet-async";
import Loading from "../../../components/loading";

import * as yup from "yup";

type FormDataState = { [key: string]: FormDataEntryValue | number };

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_KEY;

const viewport = {
  width: 500,
  height: 400,
  latitude: 0,
  longitude: 0,
  zoom: 3,
};

type UpdateAnnonceTypes = {
  titre: string;
  description: string;
  prix: number;
  voiture: string;
  latitude: number;
  longitude: number;
  address: string;
};

const updateAnnonceSchema = yup.object().shape({
  titre: yup.string().required("Le titre est requis"),
  description: yup.string().required("La description est requise"),
  prix: yup
    .number()
    .required("Le prix est requis")
    .positive("Le prix doit être un nombre positif")
    .integer("Le prix doit être un nombre entier"),
  voiture: yup.string().required("La voiture est requise"),
  latitude: yup
    .number()
    .required("La latitude est requise")
    .min(-90, "La latitude doit être supérieure ou égale à -90")
    .max(90, "La latitude doit être inférieure ou égale à 90"),
  longitude: yup
    .number()
    .required("La longitude est requise")
    .min(-180, "La longitude doit être supérieure ou égale à -180")
    .max(180, "La longitude doit être inférieure ou égale à 180"),
  address: yup.string().required("L'adresse est requise"),
});

const AnnonceDetailDashboardPage = () => {
  const { annonceId } = useParams();
  const mapRef = useRef<MapRef>();
  const { userToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const initialValues: UpdateAnnonceTypes = {
    titre: "",
    description: "",
    prix: 0,
    voiture: "",
    latitude: 0,
    longitude: 0,
    address: "",
  };
  const [annonce, setAnnonce] = useState<UpdateAnnonceTypes>({
    titre: "",
    description: "",
    prix: 0,
    voiture: "",
    latitude: 0,
    longitude: 0,
    address: "",
  });
  const [annonceLocation, setAnnonceLocation] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 2,
  });

  const [voiture, setVoitures] = useState<VoitureTypes[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState<LocationTypes[]>([]);
  console.log({ annonce });
  useEffect(() => {
    if (annonceId && loading && !annonce.titre) {
      ApiService.getAnnonce(Number(annonceId), userToken)
        .then((res) => res.json())
        .then((data: AnnonceTypes) => {
          const updateAnnonce: UpdateAnnonceTypes = {
            titre: data.titre,
            description: data.description,
            prix: data.prix,
            voiture: data.voiture.id.toString(),
            latitude: data.latitude,
            longitude: data.longitude,
            address: data.address,
          };
          setAnnonce(updateAnnonce);
          console.log(data);
          setSearchTerm(data.address);

          setAnnonceLocation({
            ...annonceLocation,
            longitude: data.longitude,
            latitude: data.latitude,
          });
        })
        .catch((err: FetchError) => console.log(err.message))
        .finally(() => setLoading(false));
    }
  }, [annonceId, loading, annonceLocation, userToken, annonce]);

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
        .then((data: VoitureTypes[]) => setVoitures(data))
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
          const response = await axios.get<GeoapifyResponse>(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=aedf3186d09b474abd1a8808eaf0bcc1`
          );
          const { formatted } = response.data.features[0].properties;
          setSearchTerm(formatted);
        } catch (error) {
          console.error(error);
        }
      };
      if (!loading) {
        getPlaceName().catch((err) => console.log(err));
      }
    }
  }, [annonceLocation, loading]);

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
    if (!loading) {
      getLocation();
    }
  }, [annonceLocation, loading]);

  const handleSearch = async (event: React.SyntheticEvent<Element, Event>) => {
    const value = (event.target as HTMLInputElement).value;
    setSearchTerm(value);

    try {
      if (value && value.length >= 3) {
        const response = await axios.get<GeoapifyResponse>(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&limit=5&apiKey=${GEOAPIFY_API_KEY}`
        );
        const data: LocationTypes[] = response.data.features.map((feature) => ({
          label: feature.properties.formatted,
          latitude: feature.properties.lat,
          longitude: feature.properties.lon,
        }));
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
    <Layout>
      <Box>
        <Grid container width={"100%"} height={"100%"}>
          <Grid item md={12} xs={12} sm={12} pl={2} pr={2}>
            <Box>
              <Breadcrumbs
                aria-label="breadcrumb"
                sx={{
                  mt: 2,
                  backgroundColor: "#295ad6",
                  p: 2,
                  borderRadius: 1,
                  color: "#fff",
                }}
              >
                <Link underline="hover" color="inherit" href="/dashboard">
                  Dashboard
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  href="/dashboard/annonce/"
                >
                  Annonce
                </Link>
                <Typography>{annonceId}</Typography>
              </Breadcrumbs>
            </Box>
            {loading && annonce.titre === "" ? (
              <Loading />
            ) : (
              <>
                <Helmet>
                  <meta charSet="utf-8" />
                  <title>{`Dashboard | Annonce ${annonce.titre}`}</title>
                </Helmet>
                <Formik
                  initialValues={annonce}
                  validationSchema={updateAnnonceSchema}
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

                        ApiService.updateAnnonce(
                          Number(annonceId),
                          jsonString,
                          userToken
                        )
                          .then((res) => res.json())
                          .then((data: AnnonceTypes) => {
                            console.log(data);
                            handleReset(e);
                          })
                          .catch((err: FetchError) => {
                            console.log(err.message);
                            console.log(err);
                          });
                      }}
                    >
                      <Typography
                        variant="h2"
                        textAlign="center"
                        sx={{ fontSize: "3rem" }}
                      >
                        Metre ajour l'annonce
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
                                <InputAdornment position="start">
                                  XAF
                                </InputAdornment>
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
                            error={Boolean(
                              touched.description && errors.description
                            )}
                            helperText={
                              touched.description && errors.description
                            }
                            fullWidth
                          />
                          <Autocomplete
                            freeSolo
                            options={options}
                            getOptionLabel={(option: { label: string }) =>
                              option.label
                            }
                            inputValue={searchTerm}
                            onInputChange={(
                              e: React.SyntheticEvent<Element, Event>
                            ) => {
                              handleSearch(e).catch((err) => console.log(err));
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
                          <Box
                            style={{ width: "100%", display: "flex", gap: 5 }}
                          >
                            <TextField
                              label="Latitude"
                              name="latitude"
                              value={annonceLocation.latitude}
                              disabled
                              fullWidth
                              onChange={handleChange("latitude")}
                              onBlur={handleBlur("latitude")}
                              error={Boolean(
                                touched.latitude && errors.latitude
                              )}
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
                              error={Boolean(
                                touched.longitude && errors.longitude
                              )}
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
                              Mettre a jour
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
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default AnnonceDetailDashboardPage;
