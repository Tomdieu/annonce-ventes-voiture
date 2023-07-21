import { Typography, Grid, Box, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Header from "../components/Header";
import Footer from "../components/Footer";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
  },
  heroSection: {
    height: "800px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    width: "100%",
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    color: '#fff',
    padding: '20px',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '-10px',
        left: '-10px',
        right: '-10px',
        bottom: '-10px',
        background: 'linear-gradient(315deg, #ffffff, #d7e1ec)',
        zIndex: '-1',
        filter: 'blur(40px)',
      },
    // backgroundColor: "rgba(0,0,0,.30)",
  },
  leftPart: {
    color: "#fff",
    padding: theme.spacing(4),
    width: "50%",
    position: "relative",
    textAlign: "center",
  },
  rightPart: {
    width: "100%",
    position: "relative",
    "& img": {
      minWidth: "100%",
      height: "auto",
      display: "block",
      //   position:'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 99,
    },
  },
  svgBackground: {
    position: "absolute",
    top: 0,
    left: "-10%",
    zIndex: 50,
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box sx={{ mb: 4 }}>
        <Header />
      </Box>

      <Grid container className={classes.heroSection}>
        <Grid item md={6} className={classes.leftPart}>
          <Typography variant="h2" textAlign="left" gutterBottom color="black">
            Welcome To,
          </Typography>
          <Typography variant="h3" textAlign="left" gutterBottom color="black">
          Annonces Ventes Voitures
          </Typography>
          <Typography variant="h6" textAlign="left" color="black">
            Discover the best deals on new and used cars.
          </Typography>
        </Grid>
        <Grid
          item
          md={6}
          className={classes.rightPart}
          sx={{
            backgroundImage: "url(/bg.svg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            display: "flex",
            p: 20,
          }}
        >
          <Box
            sx={{
              position: "relative",
            }}
          >
            <img src="/rav4.png" alt="Car" />
          </Box>
        </Grid>
      </Grid>

      <Footer />
    </Box>
  );
};

export default HomePage;
