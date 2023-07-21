import {
  Typography,
  Grid,
  Box,
  Theme,
  ButtonBase,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useStyles as useStyles1 } from "../../styles";
import { FiArrowRight } from "react-icons/fi";


const useStyles = makeStyles((theme: Theme) => ({
    container: {
      width: "100vw",
      height: "100vh",
      overflowX: "hidden",
    },
    heroSection: {
      height: "800px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      width: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(10px)",
      borderRadius: "10px",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      color: "#fff",
      // padding: "20px",
      "&::before": {
        content: '""',
        position: "absolute",
        top: "-10px",
        left: "-10px",
        right: "-10px",
        bottom: "-10px",
        background: "linear-gradient(315deg, #ffffff, #d7e1ec)",
        zIndex: "-1",
        filter: "blur(40px)",
      },
      marginTop: theme.spacing(2.5),
      // backgroundColor: "rgba(0,0,0,.30)",
    },
    leftPart: {
      color: "#fff",
      padding: theme.spacing(4),
      width: "100%",
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
        top: 0,
        left: 0,
        bottom: 0,
        width: "100%",
        transform: "scale(2)",
        //   right: 0,
        zIndex: 99,
        [theme.breakpoints.down("md")]: {
          transform: "scale(10)",
        },
        [theme.breakpoints.down("lg")]: {
          transform: "scale(3)",
        },
      },
    },
    svgBackground: {
      position: "absolute",
      top: 0,
      left: "-10%",
      zIndex: 50,
    },
    btn: {
      padding: theme.spacing(1),
      display: "flex",
      alignItems: "center",
      borderRadius: 20,
      color: "#eee",
      backgroundColor: "RGB(49, 114, 221)",
      "& .icon": {
        display: "none",
      },
      "&:hover .icon": {
        display: "inline-block",
      },
    },
    customBtn: {
      padding: theme.spacing(2),
      backgroundColor: "RGB(49, 114, 221)",
      borderRadius: 30,
      display: "flex",
      alignItems: "center",
      gap: 1,
      "& .icon": {
        display: "none",
      },
      "&:hover .icon": {
        display: "inline-block",
      },
    },
    link: {
      "&:hover *": {
        color: "#ccc",
      },
    },
  }));

const HeroSection = () => {
    const classes = useStyles()
  const customClassess = useStyles1();

  return (
    <Grid container className={classes.heroSection}>
    <Grid item md={6} sm={6} className={classes.leftPart}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <Typography
          textAlign="left"
          gutterBottom
          color="black"
          className={customClassess.h1}
          // variant="h2"
          component={"span"}
          sx={(theme) => ({
            [theme.breakpoints.down("lg")]: { fontSize: "2.9rem" },
            [theme.breakpoints.down("md")]: { fontSize: "2.3rem" },
            [theme.breakpoints.up("md")]:{fontSize:"4rem"}

          })}
        >
          Bienvenue sur ,
        </Typography>
        {/* <br /> */}
        <Typography
          className={customClassess.h3}
          textAlign="left"
          gutterBottom
          color="black"
          variant="caption"
          component={"span"}
          sx={(theme) => ({
            [theme.breakpoints.down("lg")]: { fontSize: "2.7rem" },
            [theme.breakpoints.down("md")]: { fontSize: "2.1rem" },
            [theme.breakpoints.up("md")]:{fontSize:"3rem"}
          })}
        >
          Annonces Ventes Voitures
        </Typography>
        {/* <br /> */}
        <Typography
          className={customClassess.h5}
          textAlign="left"
          color="black"
          // variant="h5"
          component={"span"}
          sx={(theme) => ({
            [theme.breakpoints.down("lg")]: { fontSize: "2.5rem" },
            [theme.breakpoints.down("md")]: { fontSize: "1.9rem" },
            [theme.breakpoints.up("md")]:{fontSize:"1.5rem"}

          })}
        >
          Découvrez les meilleures offres de voitures neuves et d'occasion.
        </Typography>
      </Box>
      <Box sx={{ width: "100%", display: "flex", mt: 3 }}>
        <ButtonBase href="/dashboard/annonce/" className={classes.link}>
          <Box className={classes.customBtn}>
            <Typography>Cree une annonce </Typography>
            <FiArrowRight className="icon" size={20} />
          </Box>
        </ButtonBase>
      </Box>
    </Grid>
    <Grid
      item
      md={6}
      sm={6}
      className={classes.rightPart}
      sx={{
        backgroundImage: "url(/bg.svg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        // backgroundSize:"100% auto",
        display: "flex",
        width: "100%",
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
  )
}

export default HeroSection