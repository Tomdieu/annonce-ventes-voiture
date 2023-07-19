import { Box, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(1),
    minHeight:'300px',
    backgroundColor:"#000",
    marginTop:theme.spacing(2),
    color:'#fff',
    borderRadius:`${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px 0px`
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root} component={"footer"}>
      <Box>
      <div className="footer-content">
          <div className="footer-logo">
            {/* Insérez ici votre logo */}
            <img src="/path/to/logo.png" alt="Logo" />
          </div>
          <div className="footer-links">
            <ul>
              <li>
                <a href="/">Accueil</a>
              </li>
              <li>
                <a href="/annonces">Annonces</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              {/* Ajoutez d'autres liens si nécessaire */}
            </ul>
          </div>
        </div>
      </Box>
      <Box className="footer-bottom">
        <div className="container">
          <p>Tous droits réservés &copy; {new Date().getFullYear()}</p>
        </div>
      </Box>
    </Box>
  );
};

export default Footer;
