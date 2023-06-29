import { Box, Button, Typography, Link, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

type Props = {};

const useStyles = makeStyles((theme) => ({
  btnLink: {
    color: "#eef2fc",
    "& :hover": {
      backgroundColor: "#7898dd",
      color: "#f2f2f3",
    },
  },
}));

const SideBar = () => {
  const classes = useStyles();
  return (
    <Box height={"100vh"} maxHeight={"100vh"} overflow={"auto"}>
      <Box
        height={"100%"}
        sx={{ backgroundColor: "#0c54ed", color: "#f1efef" }}
      >
        <Box
          sx={{
            p: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography typography={"h5"}>Trix Car Annonce</Typography>
          <IconButton>
            <Menu sx={{ height: 32, width: 32, color: "#f7f7f8" }} speed={2} />
          </IconButton>
        </Box>

        <Box sx={{ mt: 6, width: "100%" }}>
          <Link
            href={"/dashboard/marque/"}
            className={classes.btnLink}
            variant="button"
            sx={{ color: "#cad4ed", cursor: "pointer", textDecoration: "none" }}
          >
            <Box sx={{ p: 1.2, borderRadius: 1, m: 1 }}>
              <Typography variant={"body1"}>Marque</Typography>
            </Box>
          </Link>
          <Link
            href="/dashboard/modele/"
            className={classes.btnLink}
            variant="button"
            sx={{ color: "#cad4ed", cursor: "pointer", textDecoration: "none" }}
          >
            <Box sx={{ p: 1.2, borderRadius: 1, m: 1 }}>
              <Typography variant={"body1"}>Model</Typography>
            </Box>
          </Link>
          <Link
            href="/dashboard/voiture/"
            className={classes.btnLink}
            variant="button"
            sx={{ color: "#cad4ed", cursor: "pointer", textDecoration: "none" }}
          >
            <Box sx={{ p: 1.2, borderRadius: 1, m: 1 }}>
              <Typography variant={"body1"}>Voiture</Typography>
            </Box>
          </Link>
          <Link
            href="/dashboard/annonce/"
            className={classes.btnLink}
            variant="button"
            sx={{ color: "#cad4ed", cursor: "pointer", textDecoration: "none" }}
          >
            <Box sx={{ p: 1.2, borderRadius: 1, m: 1 }}>
              <Typography variant={"body1"}>Annonce</Typography>
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
