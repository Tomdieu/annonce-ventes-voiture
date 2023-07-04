import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Divider, IconButton, Paper } from "@mui/material";
import { VoitureTypes } from "../../types/";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Delete } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import millify from "millify";

type Props = {
  voiture: VoitureTypes;
};

const useStyles = makeStyles((theme) => ({
  btnLeft: {
    position: "absolute",
    zIndex: 99,
    left: 2,
    bottom: 0,
    top: 0,
    height: "100%",
    alignItems: "center",
  },
  btnRight: {
    position: "absolute",
    zIndex: 99,
    right: 2,
    bottom: 0,
    top: 0,
    height: "100%",
    alignItems: "center",
  },
  card: {
    cursor: "pointer",
    '&:hover': {
      boxShadow: "0px 0px 10px #b9f0f4",
      "& > .card-content,.card-action": {
        backgroundColor: "#b2aeaecc"
      }
    }
  },
  btnIconContainer: {
    borderRadius: 8,
  },
  priceContainer: {
    position: "absolute",
    right: 0,
    top: -10,
    p: 0.5,
    pl: 2,
    pr: 2,
    backgroundColor: "#fff",
  },
  image: {
    height: 200,
    cursor: "pointer",
    position: "relative",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      objectFit: "contain"

    },
    objectFit: "fill"

  }
}));

export default function Voiture(props: Props) {
  const { voiture } = props;
  const [image, setImage] = useState(0);
  const classes = useStyles();
  const {
    images,
    annee,
    description,
    km_parcouru,
    model,
    num_chassi,
    prix,
    type_carburant,
    boite_vitesse,
  } = voiture;
  const handleNextImage = () => {
    if (image >= images.length - 1) {
      setImage(0);
    } else {
      setImage(image + 1);
    }
  };
  const handlePreviousImage = () => {
    if (image <= 0) {
      setImage(images.length - 1);
    } else {
      setImage(image - 1);
    }
  };
  return (
    <Card className={classes.card}>
      <Box
        sx={{ width: "100%", position: "relative", backgroundColor: "#b9f0f4" }}
      >
        <Box
          className={classes.btnLeft}
          sx={{
            display: images.length > 1 ? "flex" : "none",
          }}
        >
          <Paper sx={{ borderRadius: 8 }}>
            <IconButton onClick={handlePreviousImage}>
              <ArrowLeft sx={{ color: "#1b54eb" }} />
            </IconButton>
          </Paper>
        </Box>

        <CardMedia
          className={classes.image}
          image={images[image].photo}
          title={model.nom}
        />
        <Box
          className={classes.btnRight}
          sx={{
            display: images.length > 1 ? "flex" : "none",
          }}
        >
          <Paper sx={{ borderRadius: 8 }}>
            <IconButton onClick={handleNextImage}>
              <ArrowRight />
            </IconButton>
          </Paper>
        </Box>
      </Box>

      <CardContent className="card-content" sx={{ position: "relative" }}>
        <Paper
          className={classes.priceContainer}
        >
          <Typography
            variant="h6"
            sx={{
              color: "RGB(27, 84, 235)",
              fontWeight: "400",
              fontSize: "19px",
            }}
          >
            {millify(prix, { space: true })} XAF
          </Typography>
        </Paper>
        <Typography
          gutterBottom
          variant="body2"
          component="div"
          sx={{ fontSize: "20px" }}
        >
          {model.marque?.nom} {model.nom}
        </Typography>
        <Typography variant="body1" color="text.secondary" noWrap>
          {description}
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              "& > *": { fontSize: ".8em" },
            }}
          >
            <Typography color="text.secondary">{annee}</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography color="text.secondary">
              {millify(km_parcouru * 1000, {
                units: ["m", "km", "mi", "ft"],
                space: true,
              })}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography color="text.secondary">
              {type_carburant.toUpperCase()}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography color="text.secondary">
              {boite_vitesse.toUpperCase()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions
        className="card-action"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Paper sx={{ borderRadius: 8 }}>
          <IconButton color="error">
            <Delete />
          </IconButton>
        </Paper>
        <Paper sx={{ borderRadius: 8 }}>
          <IconButton sx={{ color: "#1b54eb" }}>
            <Delete />
          </IconButton>
        </Paper>
      </CardActions>
    </Card>
  );
}
