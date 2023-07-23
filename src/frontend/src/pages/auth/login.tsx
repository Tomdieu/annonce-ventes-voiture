import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import ApiService from "../../utils/ApiService";
import { useAuth } from "../../context/AuthContext";
import { UserTypes } from "../../types";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

type ResponseType = {
  success: boolean;
  data: UserTypes;
  token: string;
};

type UserLoginType = {
  username: string;
  password: string;
};

const Login = () => {
  const date = new Date();

  const navigate = useNavigate();

  const { setUserToken, setUser } = useAuth();

  return (
    <Grid
      container
      height={"100vh"}
      width={"100vw"}
      justifyContent={"center"}
      alignItems={"center"}
      // sx={{ backgroundColor: "#218af2" }}
    >
      <Helmet>
        <title>Connexion</title>
      </Helmet>
      <Grid
        item
        width={"500px"}
        component={Paper}
        sx={{ boxShadow: "0 8px 22px 0 rgba(31, 38, 135, 0.37)" }}
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
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={(e: UserLoginType) => {
            console.log(e);
            ApiService.login(JSON.stringify(e))
              .then((res) => res.json())
              .then((data: ResponseType) => {
                if (data.success) {
                  setUser(data.data);
                  setUserToken(data.token);
                  void Swal.fire({
                    toast: true,
                    position: "bottom-start",
                    icon: "success",
                    title: "Connexion reussi",
                    showConfirmButton: false,
                    timer: 5000,
                  });
                  return navigate("/dashboard/");
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
          }}
        >
          {({ handleSubmit, handleBlur, handleChange, values }) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 3,
                padding: 3,
              }}
              component={Form}
              onSubmit={handleSubmit}
            >
              <Typography variant="h3" sx={{ textAlign: "center" }}>
                Connexion
              </Typography>
              <TextField
                label={"Nom d'utilisateur"}
                required
                name="username"
                value={values.username}
                onChange={handleChange("username")}
                onBlur={handleBlur("username")}
                fullWidth
              />
              <TextField
                label={"Mot de passe"}
                required
                name="password"
                type={"password"}
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                fullWidth
              />

              <Button type="submit" size="large" variant="contained">
                Login
              </Button>
              <Typography textAlign={"center"}>
                Vous n'avez pas de compte ? <a href="#">Inscrivez-vous</a>
              </Typography>
              <Typography textAlign={"center"}>
                Copyright &copy; 2021 - {date.getFullYear()}
              </Typography>
            </Box>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default Login;
