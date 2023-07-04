import {
  Breadcrumbs,
  Grid,
  Typography,
  Box,
  Link,
  Button,
  InputBase,
  ButtonGroup,
  Checkbox,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import Layout from "../../../components/dashboard/layouts";
import { useState, useEffect, Suspense, lazy } from "react";
import ApiService from "../../../utils/ApiService";
import { useAuth } from "../../../context/AuthContext";
import { Add, Delete, Search, Cached, InfoOutlined } from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Helmet } from "react-helmet";
import moment from "moment";
import millify from "millify";

const AddAnnonce = lazy(() => import("../../../components/annonce/AddAnnonce"));

const Voitures = () => {
  const { userToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [search, setSearch] = useState("");
  const [annonces, setAnnonces] = useState([]);
  const [selected, setSelected] = useState([]);
  const [action, setAction] = useState("none");
  useEffect(() => {
    setLoading(true);
    if (userToken) {
      ApiService.listAnnonce(userToken)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setAnnonces(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  }, [userToken]);
  return (
    <Layout>
      <Box sx={{ padding: 0, margin: 0 }} width={"100%"} height={"100%"}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Dashboard | Annonce </title>
        </Helmet>
        <Grid container width={"100%"} height={"100%"}>
          <Grid item md={12} xs={12} sm={12} pl={2} pr={2}>
            {/* <Typography variant={"h5"}>Annonce</Typography> */}
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{
                mt: 2,
                backgroundColor: "#295ad6",
                p:2,
                borderRadius: 1,
                color: "#fff",
              }}
            >
              <Link underline="hover" color="inherit" href="/dashboard">
                Dashboard
              </Link>
              <Typography>Annonce</Typography>
            </Breadcrumbs>
            <Box width="100%">
              <Box
                sx={{
                  mt: 1,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.2,
                    maxWidth: 400,
                    justifyContent: "flex-start",
                    p: 0.5,
                  }}
                >
                  <Search />
                  <ButtonGroup>
                    <InputBase
                      sx={{
                        border: "1px solid #ddd",
                        p: 0.5,
                        minWidth: "300px",
                        mr: 0.5,
                      }}
                      fullWidth
                      placeholder=""
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button variant={"contained"}>Search</Button>
                  </ButtonGroup>
                </Box>
                <Button
                  onClick={() => setShowPopup(true)}
                  variant={"contained"}
                  sx={{ borderRadius: 8, backgroundColor: "#295ad6" }}
                  endIcon={<Add />}
                >
                  Ajouter Une Annonce
                </Button>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography>Action</Typography>
                  <TextField
                    select
                    value={action}
                    fullWidth
                    sx={{
                      maxWidth: "210px",
                      p:0
                    }}
                    variant="standard"
                    onChange={(e) => setAction(e.target.value)}
                  >
                    <MenuItem value="none">
                      ----------------------------
                    </MenuItem>
                    <MenuItem value={"delete"}>
                      <Typography
                        sx={{
                          color: "#ff0000",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        Supprimer
                      </Typography>
                    </MenuItem>
                  </TextField>
                  <Button variant="contained">Go</Button>
                  <Typography>
                    {selected.length} sur {annonces.length}
                  </Typography>
                </Box>
              </Box>
              <Suspense fallback={<div>Loading...</div>}>
                <AddAnnonce
                  open={showPopup}
                  onClose={setShowPopup}
                  onReload={() => window.location.reload()}
                />
              </Suspense>
              <Grid
                container
                width={"100%"}
                gap={1}
                display={"flex"}
                flexDirection={"row"}
              >
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>TITRE</TableCell>
                        <TableCell>PRIX</TableCell>
                        <TableCell>VOITURE</TableCell>
                        <TableCell>DESCRIPTION</TableCell>
                        <TableCell>STATUS</TableCell>
                        <TableCell>CREE LE</TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {annonces.length > 0 &&
                        annonces?.map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>
                              <Checkbox />
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.id}
                            </TableCell>
                            <TableCell align="left">{row.titre}</TableCell>
                            <TableCell>
                              {millify(row.prix, { space: true })} XAF
                            </TableCell>
                            <TableCell align="left">
                              {row.voiture.model.marque?.nom}{" "}
                              {row.voiture.model.nom}{" "}
                              {row.voiture.type_vehicule} [
                              {row.voiture.type_carburant}]{" "}
                              {row.voiture.plaque_immatriculation
                                ? row.voiture.plaque_immatriculation
                                : row.voiture.num_chassi}
                            </TableCell>
                            <TableCell align="left">
                              <Typography noWrap>
                                {row.description.length>30? row.description.substring(0,30)+'...' : row.description}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">{row.status}</TableCell>
                            <TableCell>
                              {moment(row.date_creation).format(
                                "D, MMMM  YYYY à h:mm A"
                              )}
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                display: "flex",
                                gap: 2,
                                justifyContent: "flex-end",
                              }}
                            >
                              <IconButton>
                                <Delete color="error"/>
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Voitures;
