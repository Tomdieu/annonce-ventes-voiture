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
import { Add, Search } from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddMarque from "../../../components/marque/AddMarque"
import { MarqueTypes } from "../../../types";

const Marques = () => {
  const [marques, setMarques] = useState<MarqueTypes[]>([]);
  const { userToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false)
  useEffect(() => {
    if (userToken) {
      ApiService.listMarque(userToken)
        .then((res) => res.json())
        .then((data) => {
          setMarques(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
    
  }, [userToken]);
  return (
    <Layout>
      <Box sx={{padding:0,margin:0}} width={"100%"} height={"100%"}>
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
                <Button
                  onClick={()=>setShowPopup(true)}
                  variant={"contained"}
                  sx={{ borderRadius: 8, backgroundColor: "#295ad6" }}
                  endIcon={<Add />}
                >
                  Ajouter Une Marque
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
              <AddMarque open={showPopup} onClose={setShowPopup} onCreate={(data)=>setMarques([...marques,data])}/>
              {loading ? (
                <CircularProgress />
              ) : (
                <TableContainer component={Paper}>
                  <Table  aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="left">NOM</TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {marques.length > 0 &&
                        marques?.map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.id}
                            </TableCell>
                            <TableCell align="left">{row.nom}</TableCell>
                            <TableCell align="right" sx={{display:"flex",gap:2}}>
                              <Button
                                color="success"
                                variant="contained"
                                sx={{ borderRadius: 5 }}
                              >
                                Update
                              </Button>
                              <Button
                                color="primary"
                                variant="contained"
                                sx={{ borderRadius: 5 }}
                              >
                                Detail
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Marques;
