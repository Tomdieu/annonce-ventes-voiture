import {
  Breadcrumbs,
  Grid,
  Typography,
  Box,
  Link,
  Button,
  InputBase,
  CircularProgress,
} from "@mui/material";
import Layout from "../../../components/dashboard/layouts";
import { useState, useEffect } from "react";
import ApiService from "../../../utils/ApiService";
import { useAuth } from "../../../context/AuthContext";
import { Search } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ModeleTypes } from "../../../types";

const Modeles = () => {
  const [modeles, setModeles] = useState<ModeleTypes[]>([]);
  const [filtersModeles, setFiltersModeles] = useState<ModeleTypes[]>([]);
  const { userToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (userToken) {
      ApiService.listModele()
        .then((res) => res.json())
        .then((data: ModeleTypes[]) => {
          setModeles(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  }, [userToken]);

  useEffect(() => {
    if (modeles.length > 0) {
      setFiltersModeles(modeles);
    }
  }, [modeles]);

  useEffect(() => {
    if (search) {
      const filterModeles = modeles.filter((model) =>
        model.marque.nom.toLowerCase().includes(search.toLowerCase())
      );
      setFiltersModeles(filterModeles);
    } else {
      setFiltersModeles(modeles);
    }
  }, [modeles, search]);

  const columns: GridColDef<ModeleTypes>[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nom", headerName: "NOM", width: 300 },
    {
      field: "marque",
      headerName: "MARQUE",
      width: 300,
      renderCell: (params) => params.row.marque.nom,
    },
  ];

  return (
    <Layout>
      <Box width={"100%"} height={"100%"}>
        <Grid container width={"100%"} height={"100%"}>
          <Grid item md={12} xs={12} sm={12} p={2}>
            <Breadcrumbs>Marque</Breadcrumbs>
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{
                mt: 2,
                backgroundColor: "#295ad6",
                p: 1.5,
                borderRadius: 1,
                color: "#fff",
              }}
            >
              <Link underline="hover" color="inherit" href="/dashboard">
                Dashboard
              </Link>
              <Typography>Modeles</Typography>
            </Breadcrumbs>
            <Box width="100%">
              <Box sx={{ mt: 2, borderRadius: 5 }}></Box>
              <Box sx={{ mt: 1, mb: 1 }}>
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
                  <InputBase
                    sx={{ border: "1px solid #ddd", p: 0.5, borderRadius: 2 }}
                    fullWidth
                    placeholder=""
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button variant={"contained"}>Search</Button>
                </Box>
              </Box>
              {loading ? (
                <CircularProgress />
              ) : (
                <div
                  style={{
                    height: "calc(100vh - 300px)",
                    width: "100%",
                  }}
                >
                  <DataGrid
                    rows={filtersModeles}
                    columns={columns}
                  />
                </div>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Modeles;
