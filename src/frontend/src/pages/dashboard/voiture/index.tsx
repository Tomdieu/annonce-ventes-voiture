import {
  Breadcrumbs,
  Grid,
  Typography,
  Box,
  Link,
  Button,
  InputBase,
  Paper
} from "@mui/material";
import Layout from "../../../components/dashboard/layouts";
import { useState, useEffect, Suspense, lazy } from "react";
import ApiService from "../../../utils/ApiService";
import { useAuth } from "../../../context/AuthContext";
import { Add, Search } from "@mui/icons-material";
import Voiture from "../../../components/voiture/Voiture";
import { Helmet } from "react-helmet";
import {VoitureTypes} from '../../../types';
import Loading from "../../../components/loading";
const AddVoiture = lazy(() => import("../../../components/voiture/AddVoiture"));

const Voitures = () => {
  const { userToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [voitures, setVoitures] = useState<VoitureTypes[]>([]);
  // const [search, setSearch] = useState<string>('');
  useEffect(() => {
    setLoading(true);
    if (userToken) {
      ApiService.listVoiture(userToken)
        .then((res) => res.json())
        .then((data:VoitureTypes[]) => {
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
  if(loading){
    return <Loading />
  }
  return (
    <Layout>
      <Box
        sx={{
          padding: 0,
          margin: 0,
          backgroundColor: "RGBA(226, 254, 254,.2)",
        }}
        width={"100%"}
        height={"100%"}
      >
        <Helmet>
          <meta charSet="utf-8" />
          <title>Dashboard | Voiture </title>
        </Helmet>
        <Grid container width={"100%"} height={"100%"}>
          <Grid item md={12} xs={12} sm={12} pl={2} pr={2}>
            {/* <Typography variant={"h5"}>Voitures</Typography> */}
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
              <Typography>Voiture</Typography>
            </Breadcrumbs>
            <Box width="100%">
              <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box sx={{ mt: 1, mb: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      maxWidth: 400,
                      justifyContent: "flex-start",
                      p: 0.5,
                    }}
                  >
                    <Search />
                    <Paper sx={{display:'flex',alignItems:"center",borderRadius:3}}>

                    <InputBase
                      sx={{
                        border: "1px solid #ddd",
                        p: 0.5,
                        borderRadius: 2,
                        minWidth: "300px",
                      }}
                      fullWidth
                      placeholder="Search..."
                      />
                      </Paper>
                    <Button variant={"contained"}>Search</Button>
                  </Box>
                </Box>
                <Box sx={{ mt: 1, borderRadius: 5 }}>
                  <Button
                    onClick={() => setShowPopup(true)}
                    variant={"contained"}
                    sx={{ borderRadius: 8, backgroundColor: "#295ad6" }}
                    endIcon={<Add />}
                  >
                    Ajouter Une Voiture
                  </Button>
                </Box>
              </Box>
              <Suspense fallback={<div>Loading...</div>}>
                <AddVoiture
                  open={showPopup}
                  onClose={setShowPopup} 
                  onCreate={(nouvelleVoiture)=>setVoitures([...voitures,nouvelleVoiture])}/>
              </Suspense>
              <Grid
                container
                width={"100%"}
                gap={2}
                display={"flex"}
                p={2}
                flexDirection={"row"}
              >
                {voitures?.map((voiture, key) => (
                  <Grid sm={6} md={2.8} item>
                      <Voiture voiture={voiture} key={key} />
                      {/* <Link href={`/dashboard/voiture/${voiture.id}/`}>
                  </Link> */}
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
