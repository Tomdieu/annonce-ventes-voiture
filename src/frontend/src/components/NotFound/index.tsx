import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Header from "../Header";
import Footer from "../Footer";

const NotFound = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflowX: "hidden",
        display: "flex",
        padding: 0,
        margin: 0,
      }}
    >
      <Helmet>
        <title>Annonce Ventes | Not Found</title>
      </Helmet>
      <Box sx={{ flex: 1, width: "100vw", height: "100vh" }}>
        <Header sx={{ position: "relative" }} />
        <Grid container width={"100%"} height={"66%"}>
          <Grid
            item
            xs={12}
            mb={5}
            height={"100%"}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component={Paper}
              sx={{
                textAlign: "center",
                mt: 10,
                backdropFilter: "blur(10px)", // Apply blur effect to create glassmorphism
                WebkitBackdropFilter: "blur(10px)",
                width: "25%",
                padding: 5,
                borderRadius: 3,
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                color="error"
                gutterBottom
              >
                404
              </Typography>
              <Typography variant="h5" component="h2" gutterBottom>
                Oops! Page not found.
              </Typography>
              <Button
                variant="contained"
                href="/"
                sx={{ mt: 2, "&:hover": { color: "#ccc" } }}
              >
                Go to Home
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Footer />
      </Box>
    </Box>
  );
};

export default NotFound;
