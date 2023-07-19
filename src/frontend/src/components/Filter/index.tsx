import React, { useEffect, useState } from "react";

import {
  Box,
  Checkbox,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Theme,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import ApiService from "../../utils/ApiService.js";
import { MarqueTypes, _ModeleTypes, FetchError } from "../../types/index.js";

import { BOITEVITESSES, CARBURANTS } from "./data";

// import HybridIcon from "../../images/hybride.svg";

type FilterProps = {
  onPriceFilter: (filter: string) => void;
  onRecentFilter: (recent: boolean) => void;
  onMarqueSelected: (marques: string[]) => void;
  onModeleSelected: (modele: string[]) => void;
  onKilometrageMaxSelected: (km_max: number | null) => void;
  onBoiteVitesseSelected: (boiteVitesse: string) => void;
  onTypeCarburantSelected: (typeCarburant: string) => void;
  onPriceMin: (price: number | null) => void;
  onPriceMax: (price: number | null) => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  boxFilter: {
    backgroundColor: "rgba(0,0,0,.3)",
    padding: theme.spacing(1),
    borderRadius: 5,
    "&:last-child": {
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

const Filter: React.FC<FilterProps> = ({
  onPriceFilter,
  onRecentFilter,
  onPriceMax,
  onPriceMin,
  onTypeCarburantSelected,
  onKilometrageMaxSelected,
  onMarqueSelected,
  onModeleSelected,
  onBoiteVitesseSelected,
}) => {
  const classes = useStyles();
  const [marques, setMarques] = useState<MarqueTypes[]>([]);
  const [modeles, setModeles] = useState<_ModeleTypes[]>([]);
  const [selectedMarques, setSelectedMarques] = useState<string[]>([]);
  const [selectedModeles, setSelectedModeles] = useState<string[]>([]);

  useEffect(() => {
    ApiService.listMarque()
        .then((res) => res.json())
        .then((data: MarqueTypes[]) => {
          setMarques(data);
        })
        .catch((err: FetchError) => console.log(err.message));
      ApiService.listModele()
        .then((res) => res.json())
        .then((data: _ModeleTypes[]) => {
          setModeles(data);
        })
        .catch((err: FetchError) => console.log(err.message));
  }, []);
  useEffect(() => {
    if (selectedMarques.length > 0) {
      const lesMarquesSelectioner = selectedMarques?.map((_marque) => {
        if (_marque) {
          const marquesFiltres = marques?.find((marque) =>
            marque.nom.match(_marque)
          );
          return marquesFiltres;
        }
        return null;
      });
      if (!lesMarquesSelectioner) {
        setModeles([]);
      }
      const lesModeles = lesMarquesSelectioner
        .map((marque) => {
          if (marque) {
            return marque.modeles;
          }
          return [];
        })
        .flat();
      lesModeles.sort((a, b) => {
        if (a.nom < b.nom) {
          return -1; // a should be placed before b
        }
        if (a.nom > b.nom) {
          return 1; // b should be placed before a
        }
        return 0; // the order remains unchanged
      });
      setModeles(lesModeles);
    }
  }, [selectedMarques, marques]);
  useEffect(
    () => onMarqueSelected(selectedMarques),
    [selectedMarques, onMarqueSelected]
  );
  useEffect(() => {
    if (selectedModeles) {
      return onModeleSelected(selectedModeles);
    }
  }, [onModeleSelected, selectedModeles]);
  return (
    <Box className={classes.root}>
      <Box className={classes.wrapper}>
        <Box className={classes.boxFilter}>
          <FormControl sx={{ flex: 1, display: "flex", pr: 1 }}>
            <Typography variant="h6" sx={{ ml: 2 }}>
              Trier
            </Typography>
            <FormControlLabel
              labelPlacement="start"
              value="recent"
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
              control={
                <Checkbox
                  color="info"
                  onChange={(_, checked) => onRecentFilter(Boolean(checked))}
                />
              }
              label="Plus Recents"
            />
            <RadioGroup onChange={(e) => onPriceFilter(e.target.value)}>
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
          <Box
            sx={{ maxHeight: "600px", overflow: "auto", overflowX: "hidden" }}
          >
            <FormControl sx={{ flex: 1, display: "flex", pr: 1 }}>
              {marques?.map((marque) => (
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Checkbox
                      color="info"
                      value={marque.nom}
                      onChange={(e, checked) => {
                        if (checked) {
                          setSelectedMarques((_marque) => [
                            ..._marque,
                            e.target.value,
                          ]);
                        } else {
                          setSelectedMarques(
                            selectedMarques.filter(
                              (__marque) => __marque !== e.target.value
                            )
                          );
                        }
                      }}
                    />
                  }
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
          <Box
            sx={{ maxHeight: "600px", overflow: "auto", overflowX: "hidden" }}
          >
            <FormControl sx={{ flex: 1, display: "flex", pr: 1 }}>
              {modeles?.map((modele) => (
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Checkbox
                      color="info"
                      value={modele.nom}
                      onChange={(e, checked) => {
                        if (checked) {
                          setSelectedModeles([
                            ...selectedModeles,
                            e.target.value,
                          ]);
                        } else {
                          setSelectedModeles(
                            selectedModeles.filter(
                              (_modele) => _modele !== modele.nom
                            )
                          );
                        }
                      }}
                    />
                  }
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
              onChange={(e) => {
                const km = Number(e.target.value);
                if (km) {
                  onKilometrageMaxSelected(km);
                } else {
                  onKilometrageMaxSelected(null);
                }
              }}
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
              onChange={(e) => {
                const price = Number(e.target.value);
                if (price>0) {
                  onPriceMin(price);
                } else {
                  onPriceMin(null);
                }
              }}
            />
            <TextField
              label="prix max"
              fullWidth
              placeholder="prix max"
              color="success"
              type="number"
              sx={(theme) => ({ borderRadius: theme.shape.borderRadius })}
              onChange={(e) => {
                const price = Number(e.target.value);
                console.log(price)
                if (price>0) {
                  onPriceMax(price);
                } else {
                  onPriceMin(null);
                }
              }}
            />
          </Box>
        </Box>
        <Box className={classes.boxFilter}>
          <Typography sx={{ ml: 2 }} variant="h6" gutterBottom>
            Carburant
          </Typography>
          <Box>
            <FormControl sx={{ flex: 1, display: "flex", pr: 1 }}>
              <RadioGroup
                onChange={(e) => onTypeCarburantSelected(e.target.value)}
              >
                {CARBURANTS.map((carburant) => (
                  <FormControlLabel
                    labelPlacement="start"
                    value={carburant.value}
                    key={carburant.value}
                    control={<Radio color="info" />}
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    label={carburant.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
        <Box className={classes.boxFilter}>
          <Typography sx={{ ml: 2 }} variant="h6" gutterBottom>
            Boite Vitesse
          </Typography>
          <Box>
            <FormControl sx={{ flex: 1, display: "flex", pr: 1 }}>
              <RadioGroup
                onChange={(e) => onBoiteVitesseSelected(e.target.value)}
              >
                {BOITEVITESSES.map((boitevitesse) => (
                  <FormControlLabel
                    labelPlacement="start"
                    value={boitevitesse.value}
                    control={<Radio color="info" />}
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    label={boitevitesse.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Filter;
