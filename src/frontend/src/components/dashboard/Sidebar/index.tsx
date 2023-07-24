import {
  Box,
  Typography,
  Link,
  IconButton,
  Theme,
  BoxProps,
} from "@mui/material";
import { Menu, LogoutRounded } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useLocation } from "react-router-dom"; // Assuming you are using React Router
import { useAuth } from "../../../context/AuthContext";

const useStyles = makeStyles((theme: Theme) => ({
  btnLink: {
    color: "#eef2fc",
    "& :hover": {
      color: "#f2f2f3",
    },
  },
  customBtn: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    cursor: "pointer",
    borderLeft: "5px solid transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, .5)",
    },
    "&::selection": {
      backgroundColor: "transparent",
    },
    "&:active": {
      transform: "scale(.99)",
      borderLeft: "5px solid #3189fcb8",
    },
  },
}));

type CustomButtonProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
} & BoxProps;

const CustomButton = (props: CustomButtonProps) => {
  const { children, style, ...others } = props;
  const classes = useStyles();
  return (
    <Box style={style} className={classes.customBtn} {...others}>
      <Typography variant="h6" component="span">
        {children}
      </Typography>
    </Box>
  );
};

const routes = [
  { path: "/dashboard/", label: "Dashboard" },
  { path: "/dashboard/marque/", label: "Marque" },
  { path: "/dashboard/modele/", label: "Model" },
  { path: "/dashboard/voiture/", label: "Voiture" },
  { path: "/dashboard/annonce/", label: "Annonce" },
];

const SideBar = () => {
  const classes = useStyles();
  const location = useLocation();

  const { logoutUser } = useAuth();

  return (
    <Box height="100vh" maxHeight="100vh" overflow="auto">
      <Box
        height="100%"
        sx={{
          backgroundColor: "#0c54ed",
          color: "#f1efef",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            p: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            typography="h5"
            // fontFamily="Microsoft Sans Serif"
            sx={{ cursor: "pointer" }}
          >
            Annonce Ventes
            {/* <img src={"/logo-white.png"} style={{width:32,height:32}}/> */}
          </Typography>
          <IconButton>
            <Menu sx={{ height: 32, width: 32, color: "#f7f7f8" }} speed={2} />
          </IconButton>
        </Box>

        <Box sx={{ mt: 6, width: "100%", flex: 1 }}>
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={classes.btnLink}
              variant="button"
              sx={{
                color: "#cad4ed",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <CustomButton
                sx={{
                  backgroundColor:
                    location.pathname === route.path
                      ? "rgba(255,255,255,.5)"
                      : "transparent",
                }}
              >
                {route.label}
              </CustomButton>
            </Link>
          ))}
        </Box>
        <Box>
          <CustomButton
            style={{
              backgroundColor: "#ffffff40",
            }}
            onClick={() => {
              logoutUser();
              window.location.href = "/";
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              Logout <LogoutRounded />{" "}
            </span>
          </CustomButton>
          <Link
            href="/"
            className={classes.btnLink}
            variant="button"
            sx={{ color: "#cad4ed", cursor: "pointer", textDecoration: "none" }}
          >
            <CustomButton style={{ backgroundColor: "#ffffff40" }}>
              View Site
            </CustomButton>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
