import { Box, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    minHeight: "300px",
    display:"flex",
    backgroundColor: "#167df3",
    marginTop: theme.spacing(2),
    color: "#fff",
    flexDirection:"column",
    borderRadius:theme.shape.borderRadius,
    // borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px 0px`,
    "& .footer-content": {
      display: "flex",
      flex:1,
      width:"100%",
      alignItems:'center',
      gap: theme.spacing(1),
      "& .footer-logo": {
        "& img": {
          maxWidth: 128,
          maxHeight: 128,
        },
      },
      "& .footer-links": {
        "& ul": {
          listStyleType: "none",
          "& li": {
            "& a": {
              textDecoration: "none",
              // color: "RGB(49, 114, 221)",
              color:"#fff",
              fontSize:"1.3rem"
            },
          },
        },
      },
    },
    "& .footer-bottom":{
      width:"100%",
      "& .container":{
        '& p':{
          textAlign:'center',
          fontSize:'1.3rem'
        }
      }
    }
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root} component={"footer"}>
      <Box className="footer-content">
        <div className="footer-logo">
          {/* Insérez ici votre logo */}
          <img src="/logo-white.png" alt="Logo" />
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
      </Box>
      <Box className="footer-bottom">
        <div className="container">
          <p>Tous droits réservés ivantom &copy; {new Date().getFullYear()}</p>
        </div>
      </Box>
    </Box>
  );
};

export default Footer;
