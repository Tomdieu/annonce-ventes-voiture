import Layout from "../../../components/dashboard/layouts";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Divider,
  Button,
  Paper,
  MenuItem,
  InputAdornment,
  ButtonBase,
  IconButton,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import ApiService from "../../../utils/ApiService";
import { Delete } from "@mui/icons-material";
import createVoitureSchema from "../../../schema/createVoitureSchema";
import {
  TYPE_BOITE_CHOICES,
  TYPE_CARBURANT_CHOICES,
  TYPE_TRACTION,
  TYPE_VEHICULE_CHOICES,
} from "../../../components/voiture/data";
import Loading from "../../../components/loading";
import { Formik, Form } from "formik";
import { makeStyles } from "@mui/styles";
import PreviewImage from "../../../components/voiture/PreviewImage";
import ConfirmDelete from "../../../components/voiture/ConfirmDelete";

const useStyles = makeStyles((theme) => ({
  boxWrapper: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      overflow: "auto",
    },
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  label: {
    fontSize: "18px",
    minWidth: "300px",
    fontWeight: "400",
  },
  btnAddImage: {
    color: "#000",
    backgroundColor: "#000",
    "& :hover": {
      backgroundColor: "#000",
    },
  },
  imagesContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
    padding: theme.spacing(1),
  },
  imageWrapper: {
    backgroundColor: "#e0f1f5b5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1),
    borderRadius: 3,
    cursor: "pointer",
    "&: hover": {
      backgroundColor: "#808080ab",
      opacity: 0.8,
    },
    transition: "all 2s ease",
    width: 200,
    height: 200,
    position: "relative",
    "&:hover .overlay": {
      display: "block",
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    },

    "& .overlay": {
      display: "none",
    },
  },
  image: {
    width: "150px",
    height: "150px",
    cursor: "pointer",
    objectFit: "contain",
  },
}));

const VoitureView = () => {
  const { id } = useParams();
  const [vehicule, setVehicule] = useState();
  const [marques, setMarques] = useState([]);
  const [modeles, setModeles] = useState([]);
  const [marque, setMarque] = useState(0);
  const [open, setOpen] = useState(false);

  const { userToken } = useAuth();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [vehiculeImages, setVehiculeImages] = useState([]);
  console.log(vehiculeImages);
  useEffect(() => {
    if (vehicule) {
      setVehiculeImages(vehicule.images);
    }
  }, [vehicule]);
  useEffect(() => {
    if (userToken && id) {
      ApiService.getVoiture(parseInt(id), userToken)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTimeout(() => {
            setLoading(false);
            setVehicule(data);
          }, 300);
        })
        .catch((err) => console.log(err));
    }
  }, [userToken, id]);
  useEffect(() => {
    ApiService.listMarque(userToken)
      .then((res) => res.json())
      .then((data) => setMarques(data))
      .catch((err) => console.log(err.message));
  }, [userToken]);
  useEffect(() => {
    if (vehicule) {
      setMarque(vehicule.model.marque.id);
    }
  }, [vehicule]);
  useEffect(() => {
    if (marque) {
      const marque_selectionner = marques.find(
        (_marque) => _marque.id === marque
      );
      if (marque_selectionner) {
        setModeles(marque_selectionner.modeles);
      }
      console.log({ marque_selectionner });
      console.log(marque);
      console.log(marques);
      console.log(modeles);
    }
  }, [marque]);
  useEffect(() => {
    if (userToken) {
      ApiService.listMarque(userToken)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMarques(data);
        })
        .catch((e) => console.log(e.message));
    }
  }, [userToken]);
  useEffect(() => {
    if (vehicule) {
    }
  }, [vehicule]);
  const [image, setImage] = useState("");
  const [photoId, setPhotoId] = useState(0);
  const [multiple, setMultiple] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleSelectImage = (imageId, photo) => {
    setPhotoId(imageId);
    setImage(photo);
    setOpen(true);
  };

  function reset() {
    setImage("");
    setPhotoId(null);
    setMultiple(false);
  }

  function handleAddImages() {
    setMultiple(true);
    setOpen(true);
  }

  function handleDelete(imageId, photo) {
    setPhotoId(imageId);
    setImage(photo);
    setOpenDelete(true);
  }

  function handleCloseDelete() {
    reset();
    setOpenDelete(false);
  }

  const getVehiculeName = (vehicule) => {
    return `${vehicule.model.marque.nom} ${vehicule.model.nom}(${vehicule.annee})`;
  };
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
        <Grid
          container
          width={"100%"}
          height={"100%"}
          sx={{ backgroundColor: "#79c2e29e" }}
        >
          {loading && !vehicule ? (
            <Loading />
          ) : (
            <>
              <Grid
                item
                md={8}
                sm={7}
                xs={12}
                sx={{ backgroundColor: "#b7e9f5c4" }}
                height={"100%"}
                overflow={"auto"}
              >
                <Formik
                  initialValues={{
                    annee: vehicule.annee,
                    prix: vehicule.prix,
                    description: vehicule.description,
                    num_chassi: vehicule.num_chassi,
                    km_parcouru: vehicule.km_parcouru,
                    model: vehicule.model.id,
                    nombre_de_place: vehicule.nombre_de_place,
                    nombre_de_chevaux: vehicule.nombre_de_chevaux,
                    couleur: "black",
                    type_carburant: vehicule.type_carburant,
                    type_vehicule: vehicule.type_vehicule,
                    boite_vitesse: vehicule.boite_vitesse,
                    plaque_immatriculation: vehicule.plaque_immatriculation,
                    traction: vehicule.traction,
                  }}
                  validationSchema={createVoitureSchema}
                  onSubmit={(v, f) => {
                    console.log(v);
                  }}
                >
                  {({
                    values,
                    errors,
                    isValid,
                    dirty,
                    touched,
                    handleBlur,
                    handleReset,
                    handleChange,
                    handleSubmit,
                  }) => (
                    <Form
                      method="post"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(e);
                        const formData = new FormData(e.target);
                        // console.log(formData);

                        ApiService.updateVoiture(id, formData, userToken)
                          .then((res) => res.json())
                          .then((data) => {
                            console.log(data);
                            window.location.href = "/dashboard/voiture/";
                          })
                          .catch((err) => console.log(err));
                      }}
                    >
                      <Box sx={{ p: 2 }}>
                        <Typography
                          variant={"h5"}
                          fontWeight={"100"}
                          gutterBottom
                        >
                          Modifier Voiture
                        </Typography>
                        <Box>
                          <Typography
                            variant={"h5"}
                            sx={{ fontWeight: "600" }}
                            gutterBottom
                          >
                            {getVehiculeName(vehicule)}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 2,
                              flexDirection: "column",
                              mt: 2,
                              p: 2,
                            }}
                          >
                            <Box className={classes.boxWrapper}>
                              <Typography className={classes.label}>
                                Annee:
                              </Typography>
                              <TextField
                                type="number"
                                name="annee"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.annee}
                                error={
                                  Boolean(errors.annee) &&
                                  Boolean(touched.annee)
                                }
                                helperText={
                                  Boolean(errors.annee) && errors.annee
                                }
                              />
                            </Box>
                            <Divider />
                            <Box className={classes.boxWrapper}>
                              <Typography className={classes.label}>
                                Prix:
                              </Typography>
                              <TextField
                                type="number"
                                name="prix"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.prix}
                                error={
                                  Boolean(errors.prix) && Boolean(touched.prix)
                                }
                                helperText={Boolean(errors.prix) && errors.prix}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      XAF
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Box>
                            <Divider />
                            <Box className={classes.boxWrapper}>
                              <Typography className={classes.label}>
                                Description:
                              </Typography>
                              <TextField
                                sx={{ maxWidth: 600 }}
                                multiline
                                fullWidth
                                rows={6}
                                name="description"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                                error={
                                  Boolean(errors.description) &&
                                  Boolean(touched.description)
                                }
                                helperText={
                                  Boolean(errors.description) &&
                                  errors.description
                                }
                              />
                            </Box>
                            <Divider />
                            <Box className={classes.boxWrapper}>
                              <Typography className={classes.label}>
                                Num chassi:
                              </Typography>
                              <TextField
                                name="num_chassi"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.num_chassi}
                                error={
                                  Boolean(errors.num_chassi) &&
                                  Boolean(touched.num_chassi)
                                }
                                helperText={
                                  Boolean(errors.num_chassi) &&
                                  errors.num_chassi
                                }
                              />
                            </Box>
                            <Divider />
                            <Box className={classes.boxWrapper}>
                              <Typography className={classes.label}>
                                Traction:
                              </Typography>
                              <TextField
                                name="traction"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.traction}
                                select
                                error={
                                  Boolean(errors.traction) &&
                                  Boolean(touched.traction)
                                }
                                helperText={
                                  Boolean(errors.traction) && errors.traction
                                }
                              >
                                {TYPE_TRACTION.map((traction) => (
                                  <MenuItem
                                    key={traction.value}
                                    value={traction.value}
                                  >
                                    {traction.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Box>
                            <Divider />
                            <Box className={classes.boxWrapper}>
                              <Typography className={classes.label}>
                                Plaque immatriculation:
                              </Typography>
                              <TextField
                                name="plaque_immatriculation"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.plaque_immatriculation}
                                error={
                                  Boolean(errors.plaque_immatriculation) &&
                                  Boolean(touched.plaque_immatriculation)
                                }
                                helperText={
                                  Boolean(errors.plaque_immatriculation) &&
                                  errors.plaque_immatriculation
                                }
                              />
                            </Box>
                            <Divider />
                            <Box className={classes.boxWrapper}>
                              <Typography className={classes.label}>
                                Km parcouru:
                              </Typography>
                              <TextField
                                name="km_parcouru"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.km_parcouru}
                                error={
                                  Boolean(errors.km_parcouru) &&
                                  Boolean(touched.km_parcouru)
                                }
                                helperText={
                                  Boolean(errors.km_parcouru) &&
                                  errors.km_parcouru
                                }
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      KM
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Box>
                            <Divider />
                            <Box className={classes.boxWrapper}>
                              <Typography className={classes.label}>
                                Marque
                              </Typography>
                              <TextField
                                select
                                value={marque}
                                onChange={(e) => setMarque(e.target.value)}
                              >
                                {marques?.map((marque) => (
                                  <MenuItem key={marque.id} value={marque.id}>
                                    {marque.nom}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Box>
                            <Divider />
                            <Box className={classes.boxWrapper}>
                              <Typography className={classes.label}>
                                Modele:
                              </Typography>
                              <TextField
                                name="model"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.model}
                                select
                                error={
                                  Boolean(errors.model) &&
                                  Boolean(touched.model)
                                }
                                helperText={
                                  Boolean(errors.model) && errors.model
                                }
                              >
                                <MenuItem value="">
                                  Selectionner le modele
                                </MenuItem>
                                {modeles?.map((modele) => (
                                  <MenuItem key={modele.id} value={modele.id}>
                                    {modele.nom}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Box>
                            <Divider />
                            <Box className={classes.boxWrapper}>
                              <Typography className={classes.label}>
                                Nombre de place:
                              </Typography>
                              <TextField
                                name="nombre_de_place"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.nombre_de_place}
                                error={
                                  Boolean(errors.nombre_de_place) &&
                                  Boolean(touched.nombre_de_place)
                                }
                                helperText={
                                  Boolean(errors.nombre_de_place) &&
                                  errors.nombre_de_place
                                }
                              />
                            </Box>
                            <Divider />
                            <Box className={classes.boxWrapper}>
                              <Typography className={classes.label}>
                                Nombre de chevaux:
                              </Typography>
                              <TextField
                                name="nombre_de_chevaux"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.nombre_de_chevaux}
                                error={
                                  Boolean(errors.nombre_de_chevaux) &&
                                  Boolean(touched.nombre_de_chevaux)
                                }
                                helperText={
                                  Boolean(errors.nombre_de_chevaux) &&
                                  errors.nombre_de_chevaux
                                }
                              />
                            </Box>
                            <Divider />
                            {/* <Box className={classes.boxWrapper}>
                              <Typography className={classes.label}>
                                Couleur:
                              </Typography>
                              <TextField
                                value={values.couleur}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="couleur"
                                error={
                                  Boolean(errors.couleur) &&
                                  Boolean(touched.couleur)
                                }
                                helperText={
                                  Boolean(errors.couleur) && errors.couleur
                                }
                              />
                            </Box>
                            <Divider /> */}

                            <Box className={classes.boxWrapper}>
                              <Typography className={classes.label}>
                                Boite vitesse:
                              </Typography>
                              <TextField
                                value={values.boite_vitesse}
                                select
                                name="boite_vitesse"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                  Boolean(errors.boite_vitesse) &&
                                  Boolean(touched.boite_vitesse)
                                }
                                helperText={
                                  Boolean(errors.boite_vitesse) &&
                                  errors.boite_vitesse
                                }
                              >
                                {TYPE_BOITE_CHOICES.map((boite) => (
                                  <MenuItem
                                    key={boite.value}
                                    value={boite.value}
                                  >
                                    {boite.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Box>
                            <Divider />
                            <Box className={classes.boxWrapper}>
                              <Typography className={classes.label}>
                                Type carburant:
                              </Typography>
                              <TextField
                                value={values.type_carburant}
                                name="type_carburant"
                                select
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                  Boolean(errors.type_carburant) &&
                                  Boolean(touched.type_carburant)
                                }
                                helperText={
                                  Boolean(errors.type_carburant) &&
                                  errors.type_carburant
                                }
                              >
                                {TYPE_CARBURANT_CHOICES.map((carburant) => (
                                  <MenuItem
                                    key={carburant.value}
                                    value={carburant.value}
                                  >
                                    {carburant.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Box>
                            <Divider />
                            <Box className={classes.boxWrapper}>
                              <Typography className={classes.label}>
                                Type vehicule:
                              </Typography>
                              <TextField
                                name="type_vehicule"
                                value={values.type_vehicule}
                                select
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                  Boolean(errors.type_vehicule) &&
                                  Boolean(touched.type_vehicule)
                                }
                                helperText={
                                  Boolean(errors.type_vehicule) &&
                                  errors.type_vehicule
                                }
                              >
                                {TYPE_VEHICULE_CHOICES.map((vehicule) => (
                                  <MenuItem
                                    key={vehicule.value}
                                    value={vehicule.value}
                                  >
                                    {vehicule.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              p: 1,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Button color="error" variant="contained">
                              Delete
                            </Button>
                            <Button
                              disable={!dirty || !isValid}
                              color="info"
                              variant="contained"
                              type={"submit"}
                            >
                              Save
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Grid>
              <Grid
                item
                md={4}
                sm={5}
                sx={{
                  backgroundColor: "#dedede",
                  p: 2,
                  right: 0,
                  bottom: 0,
                  top: 0,
                }}
                height={"100vh"}
                position={"static"}
              >
                <Box height={"100%"} overflow={"auto"}>
                  <Box>
                    <Button
                      className={classes.btnAddImage}
                      onClick={handleAddImages}
                      variant="contained"
                    >
                      Ajouter une image
                    </Button>
                  </Box>
                  <PreviewImage
                    oldImage={image}
                    photoId={photoId}
                    voitureId={id}
                    open={open}
                    multiple={multiple}
                    onClose={() => {
                      setOpen(false);
                      reset();
                    }}
                    onNewImages={(newImages) => {
                      setVehiculeImages(newImages);
                    }}
                    onUpdateImage={(imgId, img) => {
                      const updatedImg = vehiculeImages.find(
                        (veh) => veh.id === imgId
                      );
                      updatedImg.photo = img.photo;
                    }}
                  />
                  <Typography variant="h5">Photos </Typography>
                  <Box sx={{ height: "100%", width: "100%" }}>
                    <Box className={classes.imagesContainer}>
                      <ConfirmDelete
                        onClose={handleCloseDelete}
                        open={openDelete}
                        photo={image}
                        photoId={photoId}
                        onDelete={(photoId) => {
                          setVehiculeImages(
                            vehiculeImages.filter(
                              (vehiculeImg) => vehiculeImg.id !== photoId
                            )
                          );
                        }}
                      />
                      {vehiculeImages?.map((photo, index) => (
                        <Paper
                          key={index}
                          className={classes.imageWrapper}
                          // component={ButtonBase}
                        >
                          <img src={photo.photo} className={classes.image} />
                          <Box className={"overlay"}>
                            <Box
                              sx={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#d2d1d19c",
                              }}
                            >
                              <Box
                                sx={{
                                  position: "absolute",
                                  right: 5,
                                  top: 5,
                                  zIndex: 999,
                                }}
                              >
                                <Paper>
                                  <IconButton
                                    color={"error"}
                                    onClick={(e) => {
                                      handleDelete(photo.id, photo.photo);
                                    }}
                                  >
                                    <Delete />
                                  </IconButton>
                                </Paper>
                              </Box>
                              <Paper
                                sx={(theme) => ({
                                  padding: theme.spacing(1),
                                  height: 80,
                                  width: 80,
                                  borderRadius: theme.shape.borderRadius,
                                })}
                                component={ButtonBase}
                                onClick={(e) => {
                                  handleSelectImage(photo.id, photo.photo);
                                }}
                              >
                                <Typography>Changer d'image</Typography>
                              </Paper>
                            </Box>
                          </Box>
                        </Paper>
                      ))}
                    </Box>
                  </Box>
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
