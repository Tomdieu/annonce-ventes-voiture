import {
  Breadcrumbs,
  Grid,
  Typography,
  Box,
  Link,
  Button,
  InputBase,
} from "@mui/material";
import Layout from "../../../components/dashboard/layouts";
import { useState, useEffect, Suspense, lazy } from "react";
import ApiService from "../../../utils/ApiService";
import { useAuth } from "../../../context/AuthContext";
import { Add, Search } from "@mui/icons-material";
import Voiture from "../../../components/voiture/Voiture";
import { Helmet } from "react-helmet";
const AddVoiture = lazy(() => import("../../../components/voiture/AddVoiture"));

const Voitures = () => {
  const { userToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [voitures, setVoitures] = useState([]);
  useEffect(() => {
    setLoading(true);
    if (userToken) {
      ApiService.listVoiture(userToken)
        .then((res) => res.json())
        .then((data) => {
          console.log("Data");
          console.log(data);
          setVoitures(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  }, [userToken]);
  return (
    <Layout>
      <Box width={"100%"} height={"100%"}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Dashboard |</title>
        </Helmet>
        <Grid container width={"100%"} height={"100%"}>
          <Grid item md={12} xs={12} sm={12} p={2}>
            <Typography variant={"h5"}>Marque</Typography>
            <Breadcrumbs>Voitures</Breadcrumbs>
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
              <Typography>Voiture</Typography>
            </Breadcrumbs>
            <Box width="100%">
              <Box sx={{ mt: 2, borderRadius: 5 }}>
                <Button
                  onClick={() => setShowPopup(true)}
                  variant={"contained"}
                  sx={{ borderRadius: 8, backgroundColor: "#295ad6" }}
                  endIcon={<Add />}
                >
                  Ajouter Une Voiture
                </Button>
              </Box>
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
                  />
                  <Button variant={"contained"}>Search</Button>
                </Box>
              </Box>
              <Suspense fallback={<div>Loading...</div>}>
                <AddVoiture
                  open={showPopup}
                  onClose={setShowPopup}
                  onReload={() => window.location.reload()}
                />
              </Suspense>
              <Grid container gap={1} display={"flex"} flexDirection={"row"}>
                {voitures?.map((voiture, key) => (
                  <Grid sm={6} md={3} item>
                    <Voiture voiture={voiture} key={key} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Voitures;
