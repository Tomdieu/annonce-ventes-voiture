import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const date = new Date();

  const navigate = useNavigate();

  return (
    <Grid
      container
      height={"100vh"}
      width={"100vw"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ backgroundColor: "#218af2" }}
    >
      <Grid item width={"500px"} component={Paper}>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={(e) => {
            console.log(e)
          }}
        >
          {({
            handleSubmit,
            isValid,
            handleBlur,
            handleChange,
            values,
          }) => (
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
                Login
              </Typography>
              <TextField
                label={"username"}
                required
                name="username"
                value={values.username}
                onChange={handleChange("username")}
                onBlur={handleBlur("username")}
                fullWidth
              />
              <TextField
                label={"password"}
                required
                name="password"
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                fullWidth
              />

              <Button
                type="submit"
                size="large"
                variant="contained"
              >
                Login
              </Button>
              <Typography textAlign={"center"}>
                Don't have an account ? <a href="#">Register</a>
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
