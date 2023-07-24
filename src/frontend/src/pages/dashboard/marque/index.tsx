import {
  Breadcrumbs,
  Grid,
  Typography,
  Box,
  Link,
  Button,
  InputBase,
  CircularProgress,
  Theme,
  ButtonBase,
} from "@mui/material";
import Layout from "../../../components/dashboard/layouts";
import { useState, useEffect } from "react";
import ApiService from "../../../utils/ApiService";
import { Search, Delete } from "@mui/icons-material";
import { MarqueTypes } from "../../../types";
import { makeStyles } from "@mui/styles";
import { useAuth } from "../../../context/AuthContext";

const useStyles = makeStyles((theme: Theme) => ({
  marqueContainer: {
    p: 0,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "rgba(255,255,255,.5)",
    borderRadius: theme.shape.borderRadius,
    position: "relative",
    cursor: "pointer",
    "& .btnBox": {
      display: "none",
      position: "absolute",
      right: theme.spacing(0.5),
      top: theme.spacing(0.5),
      zIndex: 99,
      "& .btn": {
        padding: theme.spacing(0.5),
        borderRadius: 1,
      },
    },
    "&:hover .btnBox": {
      display: "block",
    },
  },
}));

const Marques = () => {
  const classes = useStyles();
  const [marques, setMarques] = useState<MarqueTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  useEffect(() => {
    ApiService.listMarque()
      .then((res) => res.json())
      .then((data: MarqueTypes[]) => {
        setMarques(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <Layout>
      <Box sx={{ padding: 0, margin: 0 }} width={"100%"} height={"100%"}>
        <Grid container width={"100%"} height={"100%"}>
          <Grid item md={12} xs={12} sm={12} p={2}>
            {/* <Breadcrumbs>Marque</Breadcrumbs> */}
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
              <Typography>Marque</Typography>
            </Breadcrumbs>
            <Box width="100%">
              <Box sx={{ mt: 2, borderRadius: 5 }}>
               
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
              
              {loading ? (
                <CircularProgress />
              ) : (
                <Grid
                  container
                  gap={2}
                  mt={3}
                  p={3}
                  sx={{ backgroundColor: "" }}
                >
                  {marques?.map((marque) => (
                    <Grid
                      item
                      key={marque.id}
                      lg={1.5}
                      className={classes.marqueContainer}
                      flexDirection="column"
                    >
                      {user.is_superuser && user.is_staff && (
                        <Box className="btnBox">
                          <ButtonBase
                            sx={{
                              borderRadius: 1,
                            }}
                          >
                            <Box className="btn">
                              <Delete />
                            </Box>
                          </ButtonBase>
                        </Box>
                      )}

                      <img
                        src={marque.logo}
                        style={{
                          width: "100%",
                          height: "120px",
                          objectFit: "contain",
                          marginTop: "10px",
                        }}
                      />
                      <Typography textAlign="center" sx={{ width: "100%" }}>
                        {marque.nom}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Marques;
