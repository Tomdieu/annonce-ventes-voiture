import React, { useEffect, useState } from "react";

import {
  Box,
  Checkbox,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Theme,
  TextField,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { useAuth } from "../../context/AuthContext.js";
import ApiService from "../../utils/ApiService.js";
import { MarqueTypes, ModeleTypes } from "../../types/index.js";
import { TbManualGearbox } from "react-icons/tb";

interface FilterProps {
  onPriceFilter: (filter: "asc" | "desc") => void;
  onRecentFilter: (recent: boolean) => void;
  onMarqueSelected: (marque: string) => void;
  onModeleSelected: (modele: string) => void;
  onKilometrageSelected: () => void;
  onTransmissionSelected: (transmission: string) => void;
  onTypeCarburantSelected: (typeCarburant: string) => void;
  onPriceMin: (price: number) => void;
  onPriceMax: (price: number) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  boxFilter: {
    backgroundColor: "rgba(0,0,0,.3)",
    padding: theme.spacing(1),
    borderRadius: 5,
    "&:last": {
      marginBottom: theme.spacing(1),
    },
  },
  root: {
    display: "flex",
    flex: 1,
    padding: theme.spacing(0),
    width: "100%",
  },
  wrapper: {
    padding: theme.spacing(0.5),
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
    flex: 1,
  },
}));

const Filter: React.FC<FilterProps> = (props: FilterProps) => {
  //   const {
  //     onPriceFilter,
  //     onRecentFilter,
  //     onPriceMax,
  //     onPriceMin,
  //     onTypeCarburantSelected,
  //     onKilometrageSelected,
  //     onMarqueSelected,
  //     onModeleSelected,
  //     onTransmissionSelected,
  //   } = props;
  const classes = useStyles();
  const [marques, setMarques] = useState<MarqueTypes>([]);
  const [modeles, setModeles] = useState<ModeleTypes>([]);
  const [selectedMarques, setSelectedMarques] = useState<string[]>([]);
  const [selectedModeles, setSelectedModeles] = useState<string[]>([]);
  const { userToken } = useAuth();
  useEffect(() => {
    if (userToken) {
      ApiService.listMarque(userToken)
        .then((res) => res.json())
        .then((data) => {
          setMarques(data);
        })
        .catch((err) => console.log(err.message));
      ApiService.listModele(userToken)
        .then((res) => res.json())
        .then((data) => {
          setModeles(data);
        })
        .catch((err) => console.log(err.message));
    }
  }, [userToken]);
  return (
    <Box className={classes.root}>
      <Box className={classes.wrapper}>
        <Box className={classes.boxFilter}>
          <FormControl sx={{ flex: 1, display: "flex", pr: 1 }}>
            <Typography variant="h6" sx={{ ml: 2 }}>
              Trier
            </Typography>
            <RadioGroup>
              <FormControlLabel
                labelPlacement="start"
                value="recent"
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                control={<Checkbox color="info" />}
                label="Plus Recents"
              />
              <FormControlLabel
                labelPlacement="start"
                value="prix-desc"
                control={<Radio color="info" />}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                label={
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    <BiUpArrowAlt size={24} /> Prix
                  </Typography>
                }
              />
              <FormControlLabel
                labelPlacement="start"
                value="prix-asc"
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                control={<Radio color="info" />}
                label={
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <BiDownArrowAlt size={24} /> Prix
                  </span>
                }
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box className={classes.boxFilter}>
          <Typography sx={{ ml: 2 }} variant="h6">
            Marque
          </Typography>
          <Box sx={{ maxHeight: "600px",overflow:"auto",overflowX:"hidden" }}>
            <FormControl sx={{ flex: 1, display: "flex", pr: 1 }}>
              {marques?.map((marque) => (
                <FormControlLabel
                  labelPlacement="start"
                  control={<Checkbox color="info" />}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  label={marque.nom}
                  key={marque.id}
                />
              ))}
            </FormControl>
          </Box>
        </Box>
        <Box className={classes.boxFilter}>
          <Typography sx={{ ml: 2 }} variant="h6">
            Modele
          </Typography>
          <Box sx={{ maxHeight: "600px",overflow:"auto",overflowX:"hidden" }}>
          <FormControl sx={{ flex: 1, display: "flex", pr: 1 }}>
              {marques?.map((modele) => (
                <FormControlLabel
                  labelPlacement="start"
                  control={<Checkbox color="info" />}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  label={modele.nom}
                  key={modele.id}
                />
              ))}
            </FormControl>
          </Box>
        </Box>
        <Box className={classes.boxFilter}>
          <Typography sx={{ ml: 2 }} variant="h6" gutterBottom>
            Kilometrage
          </Typography>
          <Box sx={{ flex: 1, display: "flex", pr: 1, ml: 2 }}>
            <TextField
              label="km max"
              fullWidth
              placeholder="km max"
              color="success"
              type="number"
              sx={(theme) => ({ borderRadius: theme.shape.borderRadius })}
            />
          </Box>
        </Box>
        <Box className={classes.boxFilter}>
          <Typography sx={{ ml: 2 }} variant="h6" gutterBottom>
            Prix
          </Typography>
          <Box sx={{ flex: 1, display: "flex", pr: 1, ml: 2, gap: 1 }}>
            <TextField
              label="Prix min"
              fullWidth
              placeholder="prix min"
              color="success"
              type="number"
              sx={(theme) => ({ borderRadius: theme.shape.borderRadius })}
            />
            <TextField
              label="prix max"
              fullWidth
              placeholder="prix max"
              color="success"
              type="number"
              sx={(theme) => ({ borderRadius: theme.shape.borderRadius })}
            />
          </Box>
        </Box>
        <Box className={classes.boxFilter}>
          <Typography sx={{ ml: 2 }} variant="h6" gutterBottom>
            Carburant
          </Typography>
          <Box>
            <FormControl sx={{ flex: 1, display: "flex", pr: 1 }}>
              <RadioGroup>
                <FormControlLabel
                  labelPlacement="start"
                  value="essence"
                  control={<Radio color="info" />}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  label={
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      <BiUpArrowAlt size={24} /> Essence
                    </Typography>
                  }
                />
                <FormControlLabel
                  labelPlacement="start"
                  value="gazoil"
                  control={<Radio color="info" />}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  label={
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      <BiUpArrowAlt size={24} /> Gazoil
                    </Typography>
                  }
                />
                <FormControlLabel
                  labelPlacement="start"
                  value="electrique"
                  control={<Radio color="info" />}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  label={
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      <BiUpArrowAlt size={24} /> ELectrique
                    </Typography>
                  }
                />
                <FormControlLabel
                  labelPlacement="start"
                  value="hybride"
                  control={<Radio color="info" />}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  label={
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      <BiUpArrowAlt size={24} /> Hybride
                    </Typography>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
        <Box className={classes.boxFilter}>
          <Typography sx={{ ml: 2 }} variant="h6" gutterBottom>
            Transmission
          </Typography>
          <Box>
            <FormControl sx={{ flex: 1, display: "flex", pr: 1 }}>
              <RadioGroup>
                <FormControlLabel
                  labelPlacement="start"
                  value="manuelle"
                  control={<Radio color="info" />}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  label={
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      <TbManualGearbox size={24} /> Manual
                    </Typography>
                  }
                />
                <FormControlLabel
                  labelPlacement="start"
                  value="automatic"
                  control={<Radio color="info" />}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  label={
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      <BiUpArrowAlt size={24} /> Automatic
                    </Typography>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Filter;
