import { Grid, Box, Typography, Link } from "@mui/material";
import { useState, useEffect } from "react";
import ApiService from "../utils/ApiService";
import Annonce from "../components/annonce/Annonce";
import Filter from "../components/Filter";

import { AnnonceTypes, FetchError } from "../types";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loading from "../components/loading";

const IndexPage = () => {
  const [annonces, setAnnonces] = useState<AnnonceTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterAnnonce, setFilterAnnonce] = useState<AnnonceTypes[]>([]);
  const [recents, setRecents] = useState<boolean>();
  const [priceFilter, setPriceFilter] = useState<string>();
  const [marquesSelectionner, setMarquesSelectionner] = useState<string[]>([]);
  const [modelesSelectionner, setModelesSelectionner] = useState<string[]>([]);
  const [typeCarburant, setTypeCarburant] = useState<string>();
  const [boiteVitesse, setBoiteVitesse] = useState<string>();
  const [kmMax, setKmMax] = useState<number>();
  const [priceMin, setPriceMin] = useState<number | null>();
  const [priceMax, setPriceMax] = useState<number | null>();
  const [year, setYear] = useState<number | null>();

  useEffect(() => {
    setLoading(true);
    ApiService.listAnnonces()
      .then((res) => res.json())
      .then((data: AnnonceTypes[]) => setAnnonces(data))
      .catch((err: FetchError) => console.log(err.message))
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    if (annonces) {
      setFilterAnnonce(annonces);
    }
  }, [annonces]);
  useEffect(() => {
    if (recents) {
      filterAnnonce.sort(function (a, b) {
        return (
          new Date(a.date_creation).getTime() -
          new Date(b.date_creation).getTime()
        );
      });
    } else {
      filterAnnonce.sort(function (a, b) {
        return (
          new Date(b.date_creation).getTime() -
          new Date(a.date_creation).getTime()
        );
      });
    }
  }, [annonces, filterAnnonce, recents]);
  useEffect(() => {
    if (priceFilter) {
      if (priceFilter === "prix-asc") {
        filterAnnonce.sort(function (a, b) {
          return b.prix - a.prix;
        });
      } else {
        filterAnnonce.sort(function (a, b) {
          return b.prix - a.prix;
        });
      }
    }
  }, [filterAnnonce, priceFilter]);
  useEffect(() => {
    if (marquesSelectionner.length > 0) {
      const annonceParModeles = annonces.filter((annonce) =>
        marquesSelectionner.includes(annonce.voiture.model.marque.nom)
      );
      setFilterAnnonce(annonceParModeles);
    } else {
      setFilterAnnonce(annonces);
    }
  }, [annonces, marquesSelectionner]);
  useEffect(() => {
    if (modelesSelectionner.length > 0) {
      const annonceParModeles = annonces.filter((annonce) =>
        modelesSelectionner.includes(annonce.voiture.model.nom)
      );
      setFilterAnnonce(annonceParModeles);
    } else {
      setFilterAnnonce(annonces);
    }
  }, [annonces, modelesSelectionner]);
  useEffect(() => {
    if (typeCarburant) {
      const annonceParTypeCarburant = annonces.filter(
        (annonce) => annonce.voiture.type_carburant === typeCarburant
      );
      setFilterAnnonce(annonceParTypeCarburant);
    }
  }, [annonces, typeCarburant]);

  useEffect(() => {
    if (boiteVitesse) {
      const annonceParboiteVitesse = annonces.filter(
        (annonce) => annonce.voiture.boite_vitesse === boiteVitesse
      );
      setFilterAnnonce(annonceParboiteVitesse);
    }
  }, [annonces, boiteVitesse]);

  useEffect(() => {
    if (kmMax) {
      console.log({ kmMax });
      const annonceParKmMax = annonces.filter(
        (annonce) => annonce.voiture.km_parcouru <= kmMax
      );
      setFilterAnnonce(annonceParKmMax);
    } else {
      setFilterAnnonce(annonces);
    }
  }, [annonces, kmMax]);

  useEffect(() => {
    if (priceMin) {
      const annonceParPrixMin = annonces.filter(
        (annonce) => annonce.prix >= priceMin
      );
      setFilterAnnonce(annonceParPrixMin);
    } else {
      setFilterAnnonce(annonces);
    }
  }, [annonces, priceMin]);
  useEffect(() => {
    console.log({ priceMax });
    if (priceMax) {
      const annonceParPrixMax = annonces.filter(
        (annonce) => annonce.prix <= priceMax
      );
      setFilterAnnonce(annonceParPrixMax);
    } else {
      setFilterAnnonce(annonces);
    }
  }, [annonces, priceMax]);

  useEffect(() => {
    if (year) {
      const annonceParAnnee = annonces.filter(
        (annonce) => annonce.voiture.annee === year
      );
      setFilterAnnonce(annonceParAnnee);
    } else {
      setFilterAnnonce(annonces);
    }
  }, [year, annonces]);

  return (
    <Grid
      container
      height={"100vh"}
      width={"100vw"}
      maxHeight={"100vh"}
      overflow={"auto"}
      position={"relative"}
      padding={0}
      margin={0}
    >
      <Grid
        item
        md={2}
        sm={3}
        lg={2}
        xs={2}
        height={"100%"}
        maxHeight={"100vh"}
        overflow={"auto"}
        sx={{
          left: 0,
          bottom: 0,
          top: 0,
          position: "static",
          // backgroundColor: "#2e6ee5e6",
          color: "#fff",
          display: "flex",
          backgroundColor: "#fff",
        }}
        padding={0}
        margin={0}
      >
        <Filter
          onPriceFilter={setPriceFilter}
          onRecentFilter={setRecents}
          onMarqueSelected={setMarquesSelectionner}
          onModeleSelected={setModelesSelectionner}
          onKilometrageMaxSelected={setKmMax}
          onPriceMax={setPriceMax}
          onPriceMin={setPriceMin}
          onTypeCarburantSelected={setTypeCarburant}
          onBoiteVitesseSelected={setBoiteVitesse}
          onYear={setYear}
        />
      </Grid>
      <Grid
        item
        md={10}
        sm={9}
        lg={10}
        xs={10}
        maxHeight={"100vh"}
        overflow={"auto"}
        sx={{ backgroundColor: "#e6f5fee6", p: 2 }}
      >
        <Box sx={{ mb: 10, position: "relative" }}>
          <Header />
        </Box>
        <Box flex={1}>
          <Typography
            variant={"h4"}
            sx={{ color: "#2794e7e0", textShadow: "2px 0px 3px #98caf0e0" }}
            gutterBottom
          >
            Annonce des voitures
          </Typography>
          {loading ? (
            <Loading />
          ) : (
            <Grid container spacing={1} flex={1}>
              {filterAnnonce?.map((annonce) => (
                <Grid item lg={3} md={4} sm={6} xs={12} key={annonce.id}>
                  <a href={`/annonces/${annonce.id}/`}>
                    <Annonce
                      annonce={annonce}
                    />
                  </a>
                </Grid>
              ))}
            </Grid>
          )}

          <Footer />
        </Box>
      </Grid>
    </Grid>
  );
};

export default IndexPage;
