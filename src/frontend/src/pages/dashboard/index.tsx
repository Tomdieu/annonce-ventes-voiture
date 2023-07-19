import { Box, Typography, Grid, Theme } from "@mui/material";
import { useEffect, useState } from "react";

import Layout from "../../components/dashboard/layouts";
import CountNumber from "../../components/CountNumber";
import { makeStyles } from "@mui/styles";

import { useAuth } from "../../context/AuthContext";

import ApiService from "../../utils/ApiService";
import millify from "millify";

import {
  VoitureTypes,
  AnnonceTypes,
  FetchError,
} from "../../types";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    "& .recent": {
      color: "rgba(0,0,0,.5)",
    },
    "& .box": {
      backgroundColor: "rgba(255,255,255,.3)",
      padding: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      display: "flex",
      flexDirection: "column",
      flex: 1,
    },
    "& table": {
      fontFamily: "arial, sans-serif",
      borderCollapse: "collapse",
      width: "100%",
    },
    "& td, th": {
      border: "1px solid #dddddd",
      textAlign: "left",
      padding: "8px",
      fontSize: "1rem",
    },
    "& th": {
      fontSize: ".8rem",
    },
    "& tr:nth-child(even)": {
      backgroundColor: "#ffffffb8",
    },
    "& .bbb": {
      display: "flex",
      width: "100%",
      flex: 1,
    },
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [recentesVoitures, setRecentesVoitures] = useState<VoitureTypes[]>([]);
  const [recentesAnnonces, setRecentesAnnonces] = useState<AnnonceTypes[]>([]);
  const [numModel, setNumModele] = useState(0);
  const [numMarque, setNumMarque] = useState(0);
  const [numVoiture, setNumvoiture] = useState(0);
  const [numAnnonce, setNumAnnonce] = useState(0);

  const { userToken } = useAuth();

  useEffect(() => {
    if (userToken) {
      ApiService.listVoiture(userToken, "limit=5")
        .then((res) => res.json())
        .then((data: VoitureTypes[]) => {
          setRecentesVoitures(data);
        })
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        .catch((err) => console.log(err.message));
      ApiService.listAnnonce(userToken, "limit=5")
        .then((res) => res.json())
        .then((data: AnnonceTypes[]) => {
          setRecentesAnnonces(data);
        })
        .catch((err:FetchError) => console.log(err.message));

      const fetchMarque = async () => {
        const res = await ApiService.listMarque();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data:[] = await res.json();
        setNumMarque(data.length);
      };

      const fetchModele = async () => {
        const res = await ApiService.listModele();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data:[] = await res.json();
        setNumModele(data.length);
      };

      const fetchVoiture = async () => {
        const res = await ApiService.listVoiture(userToken);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data: [] = await res.json();
        setNumvoiture(data.length);
      };

      const fetchAnnonce = async () => {
        const res = await ApiService.listAnnonce(userToken);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data:string[] = await res.json();
        setNumAnnonce(data.length);
      };
      void (async () => {
        await fetchMarque();
        await fetchModele();
        await fetchVoiture();
        await fetchAnnonce();
      })();
    }
  }, [userToken]);
  return (
    <Layout>
      <Box width={"100%"} height={"100%"}>
        <Grid
          container
          width={"100%"}
          height={"100%"}
          className={classes.container}
        >
          <Grid
            item
            md={12}
            xs={12}
            sm={12}
            pl={0}
            pr={0}
            p={0.5}
            height={"100%"}
            width={"100%"}
            flex={1}
          >
            <Typography variant={"h4"} gutterBottom sx={{ ml: 2, mt: 1 }}>
              Dashboard
            </Typography>
            <Box
              sx={{
                p: 0.5,
                height: "92.5%",
                backgroundColor: "#e6f2fb",
                display: "flex",
                flex: 1,
                flexDirection: "column ",
                width: "95%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  p: 2,
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <CountNumber text={"Marques"} count={numMarque} />
                <CountNumber text={"Modeles"} count={numModel} />

                <CountNumber text={"Voitures"} count={numVoiture} />
                <CountNumber text={"Annonces"} count={numAnnonce} />
              </Box>
              <Grid
                container
                height={"100%"}
                p={2}
                width={"100%"}
                gap={1}
                justifyContent={"space-between"}
                className="bbb"
              >
                <Grid item md={5.95} sm={12} className="box">
                  <Typography variant="h5" className="recent">
                    Recentes voitures
                  </Typography>
                  <Box sx={{ width: "100%", flex: 1, display: "flex" }}>
                    <table style={{ width: "100%", flex: 1 }}>
                      <thead>
                        <tr>
                          <th># Chassi</th>
                          <th>Marque & Modele</th>
                          <th>Annee</th>
                          <th>Kilometrage (Km)</th>
                          <th>Prix (XAF)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentesVoitures?.map((voiture) => (
                          <tr key={voiture.id}>
                            <td>{voiture.num_chassi}</td>
                            <td>
                              {voiture.model.marque.nom} {voiture.model.nom}
                            </td>
                            <td>{voiture.annee}</td>
                            <td>{voiture.km_parcouru}</td>
                            <td>{millify(voiture.prix, { space: true })}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Box>
                </Grid>
                <Grid item md={5.95} sm={12} className="box">
                  <Typography variant="h5" className="recent">
                    Recentes Annonces
                  </Typography>
                  <Box sx={{ width: "100%", flex: 1, display: "flex" }}>
                    <table>
                      <thead>
                        <tr>
                          <th>Titre</th>
                          <th>Marque & Modele</th>
                          <th>Prix (XAF)</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentesAnnonces?.map((annonce) => (
                          <tr key={annonce.id}>
                            <td>{annonce.titre}</td>
                            <td>
                              {annonce.voiture.model.marque.nom}{" "}
                              {annonce.voiture.model.nom} (
                              {annonce.voiture.annee})
                            </td>
                            <td>{millify(annonce.prix, { space: true })}</td>
                            <td>{annonce.description.substring(0, 30)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Dashboard;
