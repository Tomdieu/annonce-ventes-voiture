import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  Grid,
  TextField,
  Container,
  Box,
  Typography,
  Theme,
  Divider,
} from "@mui/material";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { CheckCircleOutline } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import * as Yup from "yup";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ApiService from "../../utils/ApiService";
import Swal from "sweetalert2";
import { LoginRegisterTypes } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { Helmet } from "react-helmet-async";

interface RegisterFormValues {
  email: string;
  address: string;
  first_name: string;
  last_name: string;
  phone_1: string;
  phone_2: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  formContainer: {
    background: "rgba(255, 255, 255, 0.25)",
    backdropFilter: "blur(10px)",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    boxShadow: "0 8px 22px 0 rgba(31, 38, 135, 0.37)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
  },
  center: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    flexDirection: "column",
  },
}));

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  address: Yup.string().required("Required"),
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  phone_1: Yup.string().required("Required"),
  phone_2: Yup.string(),
  username: Yup.string()
    .required("Required")
    .test(
      "check-username",
      `Nom D'utilisateur Existe deja`,
      async (username) => {
        type Res = {
          message: string;
        };
        if (!username) return true;
        try {
          const response = await ApiService.checkUser(username);
          const data = (await response.json()) as Res;
          console.log(data);
          return data.message === "Found" ? false : true;
        } catch (error) {
          return true;
        }
      }
    ),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const RegisterPage: React.FC = () => {
  const classes = useStyles();
  const { setUserToken, setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const initialValues: RegisterFormValues = {
    email: "",
    address: "",
    first_name: "",
    last_name: "",
    phone_1: "",
    phone_2: "",
    username: "",
    confirmPassword: "",
    password: "",
  };

  const handleSubmit = (values: RegisterFormValues) => {
    // Handle registration logic here

    console.log(values);
    ApiService.register(JSON.stringify(values))
      .then((res) => res.json())
      .then((data: LoginRegisterTypes) => {
        if (data.success) {
          setUser(data.data);
          setUserToken(data.token);
          void Swal.fire({
            toast: true,
            position: "bottom-start",
            icon: "success",
            title: "Compte cree avec success",
            showConfirmButton: false,
            timer: 5000,
          });
          setTimeout(() => {
            window.location.href = "/dashboard/";
          }, 2000);
        } else {
          void Swal.fire({
            toast: true,
            position: "bottom-start",
            icon: "error",
            title: "Désolé, un problème est survenu",
            showConfirmButton: false,
            timer: 5000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        void Swal.fire({
          toast: true,
          position: "bottom-start",
          icon: "error",
          title: "Désolé, un problème est survenu",
          showConfirmButton: false,
          timer: 5000,
        });
      });
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh", overflowX: "hidden" }}>
      <Helmet>
        <title>S'inscrire</title>
      </Helmet>
      <Container>
        <Header sx={{ position: "relative" }} />

        <Grid container spacing={2} width={"100%"} mt={5}>
          <Grid
            item
            xs={12}
            className={classes.center}
            flexDirection={"column"}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                mt: 5,
              }}
            >
              <img src={"/logo-blue.png"} style={{ width: "64px" }} />
            </Box>
            <Box
              className={classes.formContainer}
              sx={{ mt: 3, mb: 3, maxWidth: 500 }}
            >
              <Formik
                initialValues={initialValues}
                validationSchema={RegisterSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Grid container spacing={2} sx={{ p: 2 }}>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <Typography variant={"h4"}>
                            Créer un compte
                          </Typography>
                          <Typography variant="caption">
                            C'est rapide et facile.
                          </Typography>
                        </Box>
                      </Grid>
                      <hr />
                      <Divider
                        sx={{ width: "100%" }}
                        orientation="horizontal"
                      />
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          name="username"
                          label="Nom d'utilisateur"
                          fullWidth
                          error={touched.username && !!errors.username}
                          helperText={touched.username && errors.username}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          name="email"
                          label="Adresse e-mail"
                          fullWidth
                          error={touched.email && !!errors.email}
                          helperText={touched.email && errors.email}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Field
                          as={TextField}
                          name="first_name"
                          label="Nom"
                          fullWidth
                          error={touched.first_name && !!errors.first_name}
                          helperText={touched.first_name && errors.first_name}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          as={TextField}
                          name="last_name"
                          label="Prénom"
                          fullWidth
                          error={touched.last_name && !!errors.last_name}
                          helperText={touched.last_name && errors.last_name}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          as={TextField}
                          name="phone_1"
                          label="Téléphone 1"
                          fullWidth
                          error={touched.phone_1 && !!errors.phone_1}
                          helperText={touched.phone_1 && errors.phone_1}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          as={TextField}
                          name="phone_2"
                          label="Téléphone 2"
                          fullWidth
                          error={touched.phone_2 && !!errors.phone_2}
                          helperText={touched.phone_2 && errors.phone_2}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          name="address"
                          label="Address"
                          fullWidth
                          error={touched.address && !!errors.address}
                          helperText={touched.address && errors.address}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          type={showPassword ? "text" : "password"}
                          name="password"
                          label="Mot de passe"
                          fullWidth
                          error={touched.password && !!errors.password}
                          helperText={touched.password && errors.password}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => setShowPassword(!showPassword)}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          label="Confirmer le mot de passe"
                          fullWidth
                          error={
                            touched.confirmPassword && !!errors.confirmPassword
                          }
                          helperText={
                            touched.confirmPassword && errors.confirmPassword
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle confirm password visibility"
                                  onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                  }
                                  edge="end"
                                >
                                  {showConfirmPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <center>
                          <Button
                            type="submit"
                            variant="contained"
                            endIcon={<CheckCircleOutline />}
                            size={"large"}
                          >
                            S'inscrire
                          </Button>
                        </center>
                      </Grid>
                      <Grid item xs={12}>
                        <a href={"/login"}>
                          <Typography textAlign={"center"}>
                            Vous avez déjà un compte ?
                          </Typography>
                        </a>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default RegisterPage;
