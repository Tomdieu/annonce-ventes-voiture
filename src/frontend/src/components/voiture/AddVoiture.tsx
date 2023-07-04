import {
  Dialog,
  Button,
  TextField,
  MenuItem,
  Grid,
  Divider,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  TransitionProps,
  Slide
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import ApiService from "../../utils/ApiService";
import { MarqueTypes, ModeleTypes } from "../../types";
import { Save, Close, Add, Delete, Restore } from "@mui/icons-material";
import React from "react";
import { makeStyles } from "@mui/styles";

import { Formik, Form } from "formik";
import arrayToFileList from "../../utils/arrayToFileList"
import createVoitureSchema from "../../schema/createVoitureSchema";
import { TYPE_BOITE_CHOICES, TYPE_CARBURANT_CHOICES, TYPE_VEHICULE_CHOICES,TYPE_TRACTION } from "./data";

const useStyles = makeStyles((theme: { spacing: (arg0: number) => any; }) => ({
  imageContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  previewImage: {
    width: 100,
    height: 100,
    marginRight: theme.spacing(2),
    objectFit: "cover"
  },
}));

type Props = {
  open: boolean;
  onClose: (value: boolean) => void;
  onCreate: (data: any) => void;
};


type FormDataState = { [key: string]: string };

const initialValues: FormDataState = {
  annee: "",
  prix: "",
  description: "",
  num_chassi: "",
  km_parcouru: "",
  model: "",
};

type previewType = {
  url: string;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SingletonAddVoiture = (props: Props) => {
  const { userToken } = useAuth();

  const classes = useStyles();

  const [modeles, setModeles] = useState<ModeleTypes[]>([]);
  const { open, onClose } = props;

  const [images, setImages] = useState<FileList | null>(null);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormDataState>(initialValues);

  const [previewImages, setPreviewImages] = useState<previewType[]>([]);
  const [marque, setMarque] = useState(0)
  const [marques, setMarques] = useState<MarqueTypes[]>([])
  useEffect(() => {
    if (images) {
      const files = Array.from(images);

      const _images: previewType[] = files.map((file) => ({
        url: URL.createObjectURL(file),
      }));

      setPreviewImages([..._images]);

      console.log({ _images });
      console.log({ images });
    }
  }, [images]);

  useEffect(() => {
    if (marque) {
      const marque_selectionner = marques.find((_marque => _marque.id === marque))
      if (marque_selectionner) {
        setModeles(marque_selectionner.modeles)
      }
      console.log({ marque_selectionner })
      console.log(marque)
      console.log(marques)
      console.log(modeles)
    }
  }, [marque])

  useEffect(() => {
    if (userToken) {
      ApiService.listMarque(userToken).then(res => res.json()).then(data => { console.log(data); setMarques(data) }).catch(e => console.log(e.message))
    }
  }, [userToken])

  const handleRemoveImage = (index: number) => {
    setPreviewImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
    setImages((_images: FileList | null) => {
      if (_images === null) {
        return null; // Return null if _images is already null
      }

      const updatedImages = [..._images];
      updatedImages.splice(index, 1);
      return arrayToFileList(updatedImages)
      // return updatedImages.length > 0 ? new FileList(updatedImages) : null;
    });
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   if (userToken) {
  //     ApiService.listModele(userToken)
  //       .then((res) => res.json())
  //       .then((data) => setModeles(data))
  //       .catch((err) => console.log(err))
  //       .finally(() => setLoading(false));
  //   }
  // }, []);

  // const createVoiture = (e: React.FormEvent<HTMLFormElement> | undefined) => {
  //   ApiService.createVoiture(JSON.stringify(e?.target), userToken)
  //     .then((res) => res.json())
  //     .then((data) => onCreate(data))
  //     .catch((err) => console.log(err))
  //     .finally(() => onClose(false));
  // };

  // const handleFileChange = (e) => {
  //   console.log(e);
  // };
  const handleBtnImg = (e: { preventDefault: () => void }) => {
    e?.preventDefault();
    document.getElementById("photos")?.click();
  };

  const fullWidth: boolean = true;
  const maxWidth = "lg";

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => onClose(false)}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      TransitionComponent={Transition}
    >
      <Box sx={{ m: 2 }}>
        <IconButton onClick={() => onClose(false)} sx={{ borderRadius: 2 }}>
          <Close />
        </IconButton>
      </Box>
      <Formik
        initialValues={{
          annee: "",
          prix: "",
          description: "",
          num_chassi: 0,
          km_parcouru: 0,
          model: "",
          nombre_de_place: 2,
          nombre_de_chevaux: 0,
          couleur: "",
          type_carburant: "",
          type_vehicule: "",
          boite_vitesse: "",
          plaque_immatriculation: "",
          traction: ""
        }}
        validationSchema={createVoitureSchema}
        onSubmit={(e) => console.log("xxx", e)}
      >
        {({
          isValid,
          values,
          errors,
          touched,
          handleBlur,
          setFieldValue,
          handleChange
        }) => (
          <Form
            id="form"
            method="post"
            name="voiture_form"
            encType="multipart/form-data"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e);
              console.log(formData);

              const fData = new FormData();

              for (const key in formData) {
                if (formData.hasOwnProperty(key)) {
                  fData.append(key, formData[key]);
                }
              }
              if (images) {
                for (let i = 0; i < images.length; i++) {
                  fData.append(`upload_photos`, images[i], images[0].name);
                }
              }

              ApiService.createVoiture(fData, userToken)
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((err) => console.log(err))
                .finally(() => onClose(false));
            }}
          >
            <Typography textAlign={"center"} variant="h4">Ajouter Une Voiture</Typography>
            <Divider />
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 5,
                flexDirection: "row",
                width: "100%",
                mt: 5,
                p:5
              }}
              container
            >
              <Grid
                md={5}
                sm={12}
                item
                sx={{
                  display: "flex",
                  gap: 1,
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
                  <TextField
                    id="marque"
                    select
                    label="Marque"
                    value={marque}
                    onChange={(e) => setMarque(parseInt(e.target.value))}
                    fullWidth
                  >
                    {marques.map((marque) => (
                      <MenuItem key={marque.id} value={marque.id}>
                        {marque.nom}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="type-boite"
                    select
                    label="Type de boîte"
                    name="boite_vitesse"
                    value={values.boite_vitesse}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                      handleFormChange(e);
                      setFieldValue(e.target.name, e.target.value, true);
                    }}
                    onBlur={handleBlur("boite_vitesse")}
                    helperText={touched.boite_vitesse && errors.boite_vitesse}
                    error={Boolean(touched.boite_vitesse && errors.boite_vitesse)}
                    fullWidth
                  >
                    {TYPE_BOITE_CHOICES.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
                  <TextField
                    id="annee"
                    name="annee"
                    label="Annee de sortie du vehicule"
                    type="number"
                    fullWidth
                    inputProps={{
                      min: "1900",
                      max: new Date().getFullYear(),
                    }}
                    variant="outlined"
                    sx={{ fontSize: "28px" }}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                      handleFormChange(e);
                      setFieldValue(e.target.name, e.target.value, true);
                    }}
                    onBlur={handleBlur("annee")}
                    value={values.annee}
                    helperText={touched.annee && errors.annee}
                    error={Boolean(touched.annee && errors.annee)}
                  />
                  <TextField
                    id="model"
                    name="model"
                    label="Modele du vehicule"
                    type="text"
                    fullWidth
                    variant="outlined"
                    sx={{ fontSize: "28px" }}
                    select
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                      handleFormChange(e);
                      setFieldValue(e.target.name, e.target.value, true);
                    }}
                    onBlur={handleBlur("model")}
                    value={values.model}
                    helperText={touched.model && errors.model}
                    error={Boolean(touched.model && errors.model)}
                  >
                    {modeles.length > 0 &&
                      modeles?.map((model) => (
                        <MenuItem key={model.id} value={model.id}>
                          {model.marque?.nom} {model.nom}
                        </MenuItem>
                      ))}
                  </TextField>
                </Box>

                <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
                  <TextField
                    label="Nombre de chevaux" 
                    type="number"
                    name="nombre_de_chevaux"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                      handleFormChange(e);
                      setFieldValue(e.target.name, e.target.value, true);
                    }}
                    onBlur={handleBlur("nombre_de_chevaux")}
                    helperText={touched.nombre_de_chevaux && errors.nombre_de_chevaux}
                    error={Boolean(touched.nombre_de_chevaux && errors.nombre_de_chevaux)}
                    fullWidth
                  />
                  <TextField
                    id="num_chassi"
                    name="num_chassi"
                    placeholder="Numeros chassi du vehicule"
                    label="Num Chassi"
                    type="text"
                    fullWidth
                    variant="outlined"
                    sx={{ fontSize: "28px" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">#</InputAdornment>
                      ),
                    }}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                      handleFormChange(e);
                      setFieldValue(e.target.name, e.target.value, true);
                    }}
                    onBlur={handleBlur("num_chassi")}
                    value={values.num_chassi}
                    helperText={
                      touched.num_chassi && errors.num_chassi
                        ? errors.num_chassi
                        : "example : 780578"
                    }
                    error={Boolean(touched.num_chassi && errors.num_chassi)}
                  />

                </Box>


                <Box sx={{ width: "100%", display: "flex", gap: 1 }} >
                  <TextField
                    id="carburant-type"
                    select
                    name="type_carburant"
                    label="Type Carburant"
                    value={values.type_carburant} // Provide the initial selected value here
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                      handleFormChange(e);
                      setFieldValue(e.target.name, e.target.value, true);
                    }}
                    onBlur={handleBlur("type_carburant")}
                    helperText={touched.type_carburant && errors.type_carburant}
                    error={Boolean(touched.type_carburant && errors.type_carburant)}
                    fullWidth
                  >
                    {TYPE_CARBURANT_CHOICES.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="km_parcouru"
                    name="km_parcouru"
                    label="km_parcouru"
                    placeholder="km parcouru par le vehicule"
                    type="text"
                    fullWidth
                    variant="outlined"
                    sx={{ fontSize: "28px" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">KM</InputAdornment>
                      ),
                    }}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                      handleFormChange(e);
                      setFieldValue(e.target.name, e.target.value, true);
                    }}
                    onBlur={handleBlur("km_parcouru")}
                    value={values.km_parcouru}
                    helperText={
                      touched.km_parcouru && errors.km_parcouru
                        ? errors.km_parcouru
                        : "example : 5 km"
                    }
                    error={Boolean(touched.km_parcouru && errors.km_parcouru)}
                  />
                </Box>
                <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
                  <TextField
                    id="vehicle-type"
                    select
                    label="Vehicle Type"
                    name="type_vehicule"
                    value={values.type_vehicule}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                      handleFormChange(e);
                      setFieldValue(e.target.name, e.target.value, true);
                    }}
                    onBlur={handleBlur("type_vehicule")}
                    helperText={touched.type_vehicule && errors.type_vehicule}
                    error={Boolean(touched.type_vehicule && errors.type_vehicule)}
                    fullWidth
                  >
                    {TYPE_VEHICULE_CHOICES.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="prix"
                    name="prix"
                    label="Prix du vehicule"
                    type="text"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">XAF</InputAdornment>
                      ),
                    }}
                    sx={{ fontSize: "28px" }}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                      handleFormChange(e);
                      setFieldValue(e.target.name, e.target.value, true);
                    }}
                    onBlur={handleBlur("prix")}
                    value={values.prix}
                    helperText={
                      touched.prix && errors.prix
                        ? errors.prix
                        : "2000000 XAF"
                    }
                    error={Boolean(touched.prix && errors.prix)}
                  />
                </Box>
                <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
                <TextField
                    id="vehicle-type"
                    select
                    label="Vehicle Type"
                    name="traction"
                    value={values.traction}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                      handleFormChange(e);
                      setFieldValue(e.target.name, e.target.value, true);
                    }}
                    onBlur={handleBlur("traction")}
                    helperText={touched.traction && errors.traction}
                    error={Boolean(touched.traction && errors.traction)}
                    fullWidth
                  >
                    {TYPE_TRACTION.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                  id="plaque_immatriculation"
                  name="plaque_immatriculation"
                  label="# D'imatriculation du vehicule"
                  type="text"
                  fullWidth
                  variant="outlined"
                  sx={{ fontSize: "28px" }}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                    handleFormChange(e);
                    setFieldValue(e.target.name, e.target.value, true);
                  }}
                  onBlur={handleBlur("plaque_immatriculation")}
                  value={values.plaque_immatriculation}
                  helperText={touched.plaque_immatriculation && errors.plaque_immatriculation}
                  error={Boolean(touched.plaque_immatriculation && errors.plaque_immatriculation)}
                />
                </Box>


              </Grid>
              <Grid
                md={5}
                sm={12}
                item
                sx={{
                  display: "flex",
                  gap: 1,
                  flexDirection: "column",
                }}
              >

                <TextField
                  id="description"
                  name="description"
                  label="Description du vehicule"
                  type="text"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  sx={{ fontSize: "28px" }}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                    handleFormChange(e);
                    setFieldValue(e.target.name, e.target.value, true);
                  }}
                  onBlur={handleBlur("description")}
                  value={values.description}
                  helperText={touched.description && errors.description}
                  error={Boolean(touched.description && errors.description)}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    onClick={handleBtnImg}
                    startIcon={<Add />}
                    variant={"contained"}
                    sx={{
                      backgroundColor: "#000",
                      color: "#fff",
                      "&:hover ": {
                        backgroundColor: "#000",
                        color: "#fff",
                        opacity: 0.5,
                      },
                      width: "110px",
                      borderRadius: 2,
                    }}
                  >
                    Images
                  </Button>
                  <Typography variant="caption" color={"#f33f4e"}>
                    {images && images?.length < 1 && "Selectionner au moin une(1) image"}
                  </Typography>
                </Box>
                <input
                  style={{ display: "none" }}
                  id="photos"
                  type="file"
                  name="photos"
                  accept="image/*"
                  multiple
                  onChange={(event) => {
                    const files = event.target.files;
                    setImages((_images: FileList | null) => {
                      let updatedImages: File[] = [];
                      if (_images){
                        for(let i=0;i<_images?.length;i++){
                          updatedImages.push(_images[i])
                        }
                      }
                      if(files){

                        for(let i=0;i<files?.length;i++){
                          updatedImages.push(files[i])
                        }
                      }

                      return arrayToFileList(updatedImages)
                    });
                  }}
                />
                <Grid md spacing={2} sx={{ display: "flex", gap: 1, overflowX: "auto", width: "100%", maxWidth: "480px" }}>
                  {previewImages.map((image, index) => (
                    <Grid
                      item
                      key={index}
                      className={classes.imageContainer}
                      sx={{ position: "relative" }}
                    >
                      <img
                        src={image.url}
                        alt="Preview"
                        className={classes.previewImage}
                      />
                      <IconButton
                        aria-label="Remove"
                        color="error"
                        style={{ "position": "absolute", "top": 5, "right": 5 }}
                        onClick={() => handleRemoveImage(index)}
                      >
                        <Delete style={{ width: 16, height: 16 }} />
                      </IconButton>
                    </Grid>
                  ))}
                </Grid>

                <Box width={"100%"} justifyContent={"space-between"} display={"flex"} gap={5} p={1}>
                  <Button
                    onClick={() => onClose(false)}
                    color="error"
                    variant={"contained"}
                    startIcon={<Restore />}
                    type="reset"
                  >
                    Reset
                  </Button>
                  <Button
                    disabled={
                      (isValid && Boolean(images && images?.length <= 1)) || loading
                    }
                    type="submit"
                    variant={"contained"}
                    endIcon={<Save />}
                  >
                    Ajouter
                  </Button>
                </Box>
              </Grid>


            </Grid>

          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

const AddVoiture = (props: Props) => <SingletonAddVoiture {...props} />;

export default (props: Props) => <AddVoiture {...props} />;
