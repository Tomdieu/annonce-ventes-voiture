import {
  Box,
  Theme
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { AnnonceSection, HeroSection, MarqueSection } from "../components/Sections";


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
  slider: {
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(8),
    // backgroundColor:"RGB(49, 114, 221)"
  },
}));

const HomePage = () => {
  const classes = useStyles();
  

  return (
    <Box className={classes.container}>
      <Header />

      <HeroSection />
      <AnnonceSection/>
      <Box sx={{ml:2,mr:2,mb:5}}>

      <MarqueSection />
      </Box>
      
      <Box sx={{ ml: 2, mr: 2 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default HomePage;
