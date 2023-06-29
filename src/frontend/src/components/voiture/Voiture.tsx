import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import { VoitureTypes } from "../../types/";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarToday,
  AttachMoney,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { FaRoad, FaKey } from "react-icons/fa";
import millify from "millify";

type Props = {
  voiture: VoitureTypes;
};

const useStyles = makeStyles((theme) => ({
  btnLeft: {
    position: "absolute",
    top: "0px",
    bottom: "0px",
    left: "0px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99,
  },
  btnRight: {
    position: "absolute",
    top: "0px",
    right: "0px",
    bottom: "0px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99,
    width: "40px",
  },
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
    proprietaire,
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
    <Card sx={{ maxWidth: 400 }}>
      <Box sx={{ width: "100%", position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            zIndex: 99,
            left: 0,
            bottom: 0,
            top: 0,
            height: "100%",
            display: images.length > 1 ? "flex" : "none",
            alignItems: "center",
          }}
        >
          <IconButton onClick={handlePreviousImage}>
            <ArrowLeft />
          </IconButton>
        </Box>

        <CardMedia
          sx={{ height: 200, cursor: "pointer", position: "relative",transition:"transform 0.3s ease",
          '&:hover':{
            transform: "scale(1.2)"
          } }}
          image={images[image].photo}
          title={model.nom}
          
        />
        <Box
          sx={{
            position: "absolute",
            zIndex: 99,
            right: 0,
            bottom: 0,
            top: 0,
            height: "100%",
            display: images.length > 1 ? "flex" : "none",
            alignItems: "center",
          }}
        >
          <IconButton onClick={handleNextImage}>
            <ArrowRight />
          </IconButton>
        </Box>
      </Box>

      <CardContent>
        <Typography
          gutterBottom
          variant="body2"
          component="div"
          sx={{ fontSize: "20px" }}
        >
          {model.marque?.nom} {model.nom} [{model.type}]
        </Typography>
        <Typography variant="body1" color="text.secondary" noWrap>
          {description}
        </Typography>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                fontSize: "18px",
              }}
            >
              <AttachMoney /> XAF {millify(prix, { space: true })}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                fontSize: "18px",
                gap:"5px"
              }}
            >
              <CalendarToday /> {annee}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap:"5px"
            }}
          >
            <Typography
              variant="caption"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                fontSize: "18px",
                gap:"5px"
              }}
            >
              {" "}
              <FaRoad />
              {"\t"}
              {millify(km_parcouru*1000,  {
  units: ['m', 'km', 'mi', 'ft'],
  space:true
})}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                fontSize: "18px",
                gap:"5px"
              }}
            >
              <FaKey /> {num_chassi}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" color="info">
          Detail
        </Button>
        <Button size="small" color="error">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
