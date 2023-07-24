/* eslint-disable */

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
} from "@mui/material";
import React from "react";
import Layout from "../../../components/dashboard/layouts";
import { useState, useEffect, Suspense, lazy } from "react";
import ApiService from "../../../utils/ApiService";
import { useAuth } from "../../../context/AuthContext";
import { Add, Search } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import { Helmet } from "react-helmet";
import moment from "moment";
import millify from "millify";
import Swal from "sweetalert2";

import { DataGrid, GridRenderCellParams, GridColDef } from "@mui/x-data-grid";

const AddAnnonce = lazy(() => import("../../../components/annonce/AddAnnonce"));

import { AnnonceTypes, _AnnonceTypes } from "../../../types";

const Annonces = () => {
  const { userToken } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [search, setSearch] = useState("");
  const [annonces, setAnnonces] = useState<AnnonceTypes[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [action, setAction] = useState("none");
  const [rows, setRows] = useState<_AnnonceTypes[]>([]);

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
      width: 300,
      renderCell: (params: GridRenderCellParams<_AnnonceTypes>) => (
        <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
          <Button
            color="info"
            onClick={() => {
              location.href = `/dashboard/annonce/${params.row.id}/`;
            }}
            variant={"contained"}
          >
            Detail
          </Button>
          <Button
            variant={"contained"}
            color="error"
            onClick={() => handleDelete(params.row)}
          >
            Supprimer
          </Button>
        </Box>
      ),
    },
  ];

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
  function handleDelete(annonce: _AnnonceTypes) {
    void Swal.fire({
      title: "Es-tu sûr ?",
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimez-le !",
    }).then((result) => {
      if (result.isConfirmed) {
        ApiService.deleteAnnonce(annonce.id, userToken)
          .then(() => {
            void Swal.fire(
              "Supprimez!",
              "Votre annonce a été supprimé",
              "success"
            );
            setAnnonces(
              annonces.filter((_annonce) => annonce.id !== _annonce.id)
            );
          })
          .catch(() => {
            void Swal.fire(
              "Erreur!",
              "Désolé, un problème est survenu.",
              "error"
            );
          });
      }
    });
  }
  const handleBulkDelete = () => {
    if (selected) {
      void Swal.fire({
        title: "Es-tu sûr de vouloir supprimer ces annonces ?",
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, supprimez-les !",
      }).then((result) => {
        if (result.isConfirmed) {
          selected?.map((annonceId) => {
            ApiService.deleteAnnonce(annonceId, userToken)
              .then(() => {
                void Swal.fire({
                  toast: true,
                  position: "bottom-start",
                  icon: "success",
                  title: "Annonce Supprimer avec succès.",
                  showConfirmButton: false,
                  timer: 5000,
                })

                setAnnonces(
                  annonces.filter((_annonce) => annonceId !== _annonce.id)
                );
              })
              .catch(() => {
                void Swal.fire({
                  toast: true,
                  position: "bottom-start",
                  icon: "error",
                  title: "Désolé, un problème est survenu.",
                  showConfirmButton: false,
                  timer: 5000,
                });
              });
          });
        }
      });
    }
  };

  useEffect(() => {
    const _userToken = localStorage.getItem("AuserToken");

    if (_userToken) {
      ApiService.listAnnonce(_userToken)
        .then((res) => res.json())
        .then((data: AnnonceTypes[]) => {
          setAnnonces(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
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
                  <Button
                    variant="contained"
                    disabled={selected.length === 0}
                    onClick={handleBulkDelete}
                  >
                    Go
                  </Button>
                  <Typography>
                    {selected.length} sur {annonces.length}
                  </Typography>
                </Box>
              </Box>
              <Suspense fallback={<div>Loading...</div>}>
                <AddAnnonce
                  open={showPopup}
                  onClose={setShowPopup}
                  onCreate={(data) => {
                    setAnnonces([...annonces, data]);
                    void Swal.fire({
                      toast: true,
                      position: "bottom-start",
                      icon: "success",
                      title: "Annonce créée avec succès.",
                      showConfirmButton: false,
                      timer: 5000,
                    });
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
                      setSelected(_selected_rows as number[]);
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
  
export default Annonces;
