import { useState, useEffect } from "react";
import { Typography, Grid, Box, Theme, ButtonBase } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { AnnonceTypes, FetchError } from "../../../types";
import ApiService from "../../../utils/ApiService";
import Annonce from "../../annonce/Annonce";
import { FiArrowRight } from "react-icons/fi";

const useStyles = makeStyles((theme: Theme) => ({
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
  link: {
    "&:hover *": {
      color: "#ccc",
    },
  },
}));

const AnnonceSection = () => {
  const classes = useStyles();
  const [annonces, setAnnonces] = useState<AnnonceTypes[]>([]);
  useEffect(() => {
    ApiService.listAnnonces("limit=8")
      .then((res) => res.json())
      .then((data: AnnonceTypes[]) => {
        setAnnonces(data);
      })
      .catch((err: FetchError) => console.log(err.message));
  }, []);
  return (
    <Grid
      container
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h4">Annonces</Typography>
        <ButtonBase className={classes.link} href="/annonces">
          <Box className={classes.btn}>
            <Typography variant="body1">Plus D'annonce</Typography>{" "}
            <FiArrowRight className={"icon"} size={20} />
          </Box>
        </ButtonBase>
      </Box>
      <Grid
        container
        spacing={1}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {annonces?.map((annonce) => (
          <Grid lg={3} md={4} sm={6} flex={1} item key={annonce.id}>
            <a href={`/annonces/${annonce.id}/`}>
              <Annonce annonce={annonce} />
            </a>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default AnnonceSection;
