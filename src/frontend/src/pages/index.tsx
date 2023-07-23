import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  AnnonceSection,
  HeroSection,
  MarqueSection,
} from "../components/Sections";

const useStyles = makeStyles(() => ({
  container: {
    width: "100vw",
    height: "100vh",
    overflowX: "hidden",
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Header />

      <HeroSection />
      <AnnonceSection />
      <Box sx={{ ml: 2, mr: 2, mb: 5 }}>
        <MarqueSection />
      </Box>

      <Box sx={{ ml: 2, mr: 2 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default HomePage;
