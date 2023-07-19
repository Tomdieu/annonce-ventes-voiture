import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
const useStyles = makeStyles((theme: Theme) => ({
  boxWrapper: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      overflow: "auto",
    },
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  label: {
    fontSize: "18px",
    minWidth: "300px",
    fontWeight: "400",
  },
  btnAddImage: {
    color: "#000",
    backgroundColor: "#000",
    "& :hover": {
      backgroundColor: "#000",
    },
  },
  imagesContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
    padding: theme.spacing(1),
  },
  imageWrapper: {
    backgroundColor: "#e0f1f5b5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1),
    borderRadius: 3,
    cursor: "pointer",
    "&: hover": {
      backgroundColor: "#808080ab",
      opacity: 0.8,
    },
    transition: "all 2s ease",
    width: 200,
    height: 200,
    position: "relative",
    "&:hover .overlay": {
      display: "block",
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    },

    "& .overlay": {
      display: "none",
    },
  },
  image: {
    width: "150px",
    height: "150px",
    cursor: "pointer",
    objectFit: "contain",
  },
}));

export default useStyles;
