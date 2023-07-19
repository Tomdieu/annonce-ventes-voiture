import {
  Breadcrumbs,
  Grid,
  Typography,
  Box,
  Link,
  Button,
  InputBase,
  ButtonGroup,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import React from "react";
import Layout from "../../../components/dashboard/layouts";
import { useState, useEffect, Suspense, lazy } from "react";
import ApiService from "../../../utils/ApiService";
import { useAuth } from "../../../context/AuthContext";
import { Add, Search, Delete, Update } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import { Helmet } from "react-helmet";
import moment from "moment";
import millify from "millify";

import { DataGrid, GridRenderCellParams, GridColDef } from "@mui/x-data-grid";
const UpdateAnnonce = lazy(
  () => import("../../../components/annonce/UpdateAnnonce")
);
const AddAnnonce = lazy(() => import("../../../components/annonce/AddAnnonce"));

import { AnnonceTypes, _AnnonceTypes } from "../../../types";

const Voitures = () => {
  const { userToken } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [search, setSearch] = useState("");
  const [annonces, setAnnonces] = useState<AnnonceTypes[]>([]);
  const [selected, setSelected] = useState([]);
  const [action, setAction] = useState("none");
  const [rows, setRows] = useState<_AnnonceTypes[]>([]);

  const [annonceId, setAnnonceId] = useState<number>();
  const [_action, _setAction] = useState("new");

  const columns: GridColDef<_AnnonceTypes>[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "titre", headerName: "Titre", width: 150 },
    { field: "prix", headerName: "Prix(XAF)", width: 150 },
    { field: "voiture", headerName: "Voiture", width: 220 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "date_creation", headerName: "Date Creation", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params: GridRenderCellParams<_AnnonceTypes>) => (
        <>
          <IconButton
            color="info"
            onClick={() => handleSelectForUpdate(params.row.id)}
          >
            <Update />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  const handleSelectForUpdate = (annonceId: number) => {
    setAnnonceId(annonceId);
    _setAction("update");
    setShowPopup(true);
  };

  useEffect(() => {
    if (!showPopup) {
      setAnnonceId(null);
      _setAction("new");
    }
  }, [showPopup]);
  const loadAnnonceIntoRow = React.useCallback(() => {
    const _annonce: _AnnonceTypes[] = annonces.map((annonce) => ({
      ...annonce,
      voiture: `${annonce.voiture.model.marque.nom} ${annonce.voiture.model.nom} ${annonce.voiture.annee}`,
      prix: `${millify(annonce.prix, { space: true })}`,
      // prix: annonce.prix,

      date_creation: moment(annonce.date_creation).format(
        "D, MMMM YYYY à h:mm A"
      ),
    }));
    setRows(_annonce);
  }, [annonces]);

  useEffect(() => {
    if (annonces.length > 0) {
      loadAnnonceIntoRow();
    }
  }, [annonces, loadAnnonceIntoRow]);
  function handleDelete(rowId: number) {
    const updatedRows = rows.filter((row) => row.id !== rowId);
    setRows(updatedRows);
  }
  useEffect(() => {
    if (userToken) {
      ApiService.listAnnonce(userToken)
        .then((res) => res.json())
        .then((data: AnnonceTypes[]) => {
          console.log(data);
          setAnnonces(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userToken]);
  useEffect(() => {
    if (search) {
      const filteredRows = rows.filter(
        (row) =>
          row.titre.includes(search) ||
          row.voiture.includes(search) ||
          row.description.includes(search)
      );
      setRows(filteredRows);
    } else {
      loadAnnonceIntoRow();
    }
  }, [search, rows, loadAnnonceIntoRow]);
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
                p: 2,
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
                    <Paper sx={{ mr: 0.5, borderRadius: 2 }}>
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
                    </Paper>
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
                      p: 0,
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
                  open={showPopup && Boolean(_action === "new")}
                  onClose={setShowPopup}
                  onCreate={(data) => setAnnonces([...annonces, data])}
                />
                <UpdateAnnonce
                  open={showPopup && Boolean(_action === "update")}
                  onClose={setShowPopup}
                  annonceId={annonceId}
                  onUpdate={(data) => {
                    const olderAnnonces = annonces.filter(
                      (_annonce) => _annonce.id !== data.id
                    );
                    setAnnonces([...olderAnnonces, data]);
                  }}
                />
              </Suspense>
              <Grid
                container
                width={"100%"}
                gap={1}
                display={"flex"}
                flexDirection={"row"}
                flex={1}
              >
                <Paper sx={{ flex: 1, width: "100%", height: "100%" }}>
                  <DataGrid
                    sx={{ width: "100%", height: "100%" }}
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                    onRowSelectionModelChange={(_selected_rows) => {
                      setSelected(_selected_rows);
                    }}
                  />
                </Paper>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Voitures;
