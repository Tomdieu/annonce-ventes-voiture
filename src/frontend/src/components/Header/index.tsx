import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Theme, AppBarProps } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useAuth } from "../../context/AuthContext";

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    backgroundColor: 'RGB(49, 114, 221)',//theme.palette.primary.main,
    borderRadius:theme.shape.borderRadius,
    color: "#fff",
    "& > *": {
      color: "#fff",
    },
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "#fff",
    // display: "flex",
    // alignItems: "flex-start",
    "&:hover": {
      color: "#eee",
    },
    "& img": {
      maxWidth: 32,
      maxHeight: 32,
    },
  },
  link: {
    textDecoration: "none",
    marginLeft: theme.spacing(2),
    '&:hover':{
        color:"#ddd"
    }
  },
  navContainer: {
    display: "flex",
  },
}));
type HeaderProps = AppBarProps;
const Header = (props:HeaderProps) => {
  const classes = useStyles();
  const {...others} = props;
  const {userToken} = useAuth()
  return (
    <AppBar {...others} sx={{backgroundColor:"RGBA(49, 114, 221,9)"}} position="absolute" className={classes.header}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          className={classes.title}
        >
          <img src="/logo-white.png" alt="Logo" />
          Annonces Voitures
          {/* <span></span> */}
        </Typography>
        <nav className={classes.navContainer}>
          <Button
            sx={{ color: "#fff" }}
            component={Link}
            to="/"
            className={classes.link}
          >
            Accueil
          </Button>
          <Button
            sx={{ color: "#fff" }}
            component={Link}
            to="/annonces"
            className={classes.link}
          >
            Annonces
          </Button>
          <Button
            sx={{ color: "#fff" }}
            component={Link}
            to="/contact/"
            className={classes.link}
          >
            Contact
          </Button>
          
          {userToken && (
            <Button
            sx={{ color: "#fff" }}
            component={Link}
            to="/dashboard/"
            className={classes.link}
          >
            Dashboard
          </Button>
          )}
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
