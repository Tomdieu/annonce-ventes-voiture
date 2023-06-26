import {
  Dialog,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Grid,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState, useLayoutEffect } from "react";
import ApiService from "../../utils/ApiService";
import { ModeleTypes } from "../../types";
import { Save, Close, Add } from "@mui/icons-material";

import { Formik, Form, Field } from "formik";

import createVoitureSchema from "../../schema/createVoitureSchema";

type Props = {
  open: boolean;
  onClose: (value: boolean) => void;
  onCreate: (data: any) => void;
};

const initialValues = {
  annee: "",
  prix: "",
  description: "",
  num_chassi: "",
  km_parcouru: "",
  model: "",
};

const SingletonAddVoiture = (props: Props) => {
  const { userToken } = useAuth();

  const [modeles, setModeles] = useState<ModeleTypes[]>([]);
  const { open, onClose } = props;

  const [images, setImages] = useState<FileList | null>(null);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(initialValues);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (userToken) {
      ApiService.listModele(userToken)
        .then((res) => res.json())
        .then((data) => setModeles(data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, []);

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

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      sx={{ width: "100vw", height: "100vh" }}
    >
      <DialogTitle>Ajouter Une Voiture</DialogTitle>
      <Divider />
      <DialogContent sx={{ width: "500px" }}>
        <DialogContentText></DialogContentText>
        {loading ? (
          <CircularProgress />
        ) : (
          <Formik
            initialValues={{
              annee: "",
              prix: "",
              description: "",
              num_chassi: 0,
              km_parcouru: 0,
              model: "",
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
                      fData.append(`upload_photos`, images[i],images[0].name);
                    }
                  }

                  ApiService.createVoiture(fData, userToken)
                    .then((res) => res.json())
                    .then((data) => console.log(data))
                    .catch((err) => console.log(err))
                    .finally(() => onClose(false));
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    gap: 2,
                    mt: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                  }}
                  container
                >
                  <Grid
                    sm={12}
                    gap={2}
                    sx={{ display: "flex", flexDirection: "column" }}
                    item
                  >
                    <TextField
                      id="annee"
                      name="annee"
                      label="Annee de sortie du vehicule"
                      type="number"
                      fullWidth
                      inputProps={{ min: "1900", max: new Date().getFullYear() }}
                      variant="outlined"
                      sx={{ fontSize: "28px" }}
                      onChange={(e) => {
                        handleFormChange(e);
                        setFieldValue(e.target.name, e.target.value, true);
                      }}
                      onBlur={handleBlur("annee")}
                      value={values.annee}
                      helperText={touched.annee && errors.annee}
                      error={Boolean(touched.annee && errors.annee)}
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
                      onChange={(e) => {
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

                    <TextField
                      id="km_parcouru"
                      name="km_parcouru"
                      label="km_parcouru"
                      placeholder="km parcouru par le vehicule"
                      type="text"
                      fullWidth
                      variant="outlined"
                      sx={{ fontSize: "28px" }}
                      onChange={(e) => {
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
                  </Grid>
                  <Grid
                    sm={12}
                    gap={2}
                    sx={{ display: "flex", flexDirection: "column" }}
                    item
                  >
                    <TextField
                      id="prix"
                      name="prix"
                      label="Prix du vehicule"
                      type="text"
                      fullWidth
                      variant="outlined"
                      sx={{ fontSize: "28px" }}
                      onChange={(e) => {
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
                    <TextField
                      id="description"
                      name="description"
                      label="Description du vehicule"
                      type="text"
                      multiline
                      rows={5}
                      fullWidth
                      variant="outlined"
                      sx={{ fontSize: "28px" }}
                      onChange={(e) => {
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
                        {!images && "Selectionner au moin une(1) image"}
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
                        setImages(files);
                      }}
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
                      onChange={(e) => {
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
                            {model.marque?.nom} {model.nom} [{model.type}]
                          </MenuItem>
                        ))}
                    </TextField>
                    <Box
                      sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
                    ></Box>
                  </Grid>

                  <Grid md={12} sm={12} item>
                    <Divider />
                    <DialogActions>
                      <Button
                        onClick={() => onClose(false)}
                        color="error"
                        variant={"contained"}
                        startIcon={<Close />}
                      >
                        Close
                      </Button>
                      <Button
                        disabled={
                          isValid && Boolean(images && images?.length <= 1)
                        }
                        type="submit"
                        variant={"contained"}
                        endIcon={<Save />}
                      >
                        Ajouter
                      </Button>
                    </DialogActions>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        )}
      </DialogContent>
    </Dialog>
  );
};

const AddVoiture = (props: Props) => <SingletonAddVoiture {...props} />;

export default (props: Props) => <AddVoiture {...props} />;
