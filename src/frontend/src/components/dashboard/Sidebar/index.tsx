import { Box, Typography, Link, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import React from "react";

type Props = {};

const useStyles = makeStyles((theme) => ({
  btnLink: {
    color: "#eef2fc",
    "& :hover": {
      // backgroundColor: "#7898dd",
      color: "#f2f2f3",
    },
  },
  cutomBtn: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    // backgroundColor:"#ffffff40",
    cursor: "pointer",
    borderLeft: "5px solid transparent",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,.5)",
    },
    "& ::selection": {
      backgroundColor: "transparent"
    },
    "&:active": {
      transform: "scale(.99)",
      borderLeft: "5px solid #3189fcb8"

    }
  }
}));

type CustomButtonProps = {
  children: React.ReactNode;
  style?:React.CSSProperties
}

const CustomButton = (props: CustomButtonProps) => {
  const { children,style } = props
  const classes = useStyles()
  return (
    <Box  style={style} className={classes.cutomBtn}>
      <Typography variant="h6" component={'span'}>{children}</Typography>
    </Box>
  )
}

const SideBar = () => {
  const classes = useStyles();
  return (
    <Box height={"100vh"} maxHeight={"100vh"} overflow={"auto"}>
      <Box
        height={"100%"}
        sx={{ backgroundColor: "#0c54ed", color: "#f1efef",display:"flex",flexDirection:"column" }}
      >
        <Box
          sx={{
            p: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            
          }}
        >
          <Typography typography={"h4"} fontFamily={"Microsoft Sans Serif"} sx={{cursor:"pointer"}}>Car Annonce</Typography>
          <IconButton>
            <Menu sx={{ height: 32, width: 32, color: "#f7f7f8" }} speed={2} />
          </IconButton>
        </Box>

        <Box sx={{ mt: 6, width: "100%",flex:1 }}>

          <Link
            href={"/dashboard/"}
            className={classes.btnLink}
            variant="button"
            sx={{ color: "#cad4ed", cursor: "pointer", textDecoration: "none" }}
          >
            {/* <Box sx={{ p: 1.2, borderRadius: 1, m: 1 }}>
              <Typography variant={"body1"}>Dashboard</Typography>
            </Box> */}
            <CustomButton>Dashboard</CustomButton>
          </Link>
          <Link
            href={"/dashboard/marque/"}
            className={classes.btnLink}
            variant="button"
            sx={{ color: "#cad4ed", cursor: "pointer", textDecoration: "none" }}
          >
            <CustomButton>Marque</CustomButton>

          </Link>
          <Link
            href="/dashboard/modele/"
            className={classes.btnLink}
            variant="button"
            sx={{ color: "#cad4ed", cursor: "pointer", textDecoration: "none" }}
          >
            <CustomButton>Model</CustomButton>

          </Link>
          <Link
            href="/dashboard/voiture/"
            className={classes.btnLink}
            variant="button"
            sx={{ color: "#cad4ed", cursor: "pointer", textDecoration: "none" }}
          >
            <CustomButton>Voiture</CustomButton>

          </Link>
          <Link
            href="/dashboard/annonce/"
            className={classes.btnLink}
            variant="button"
            sx={{ color: "#cad4ed", cursor: "pointer", textDecoration: "none" }}
          >
            <CustomButton>Annonce</CustomButton>

            {/* <Box sx={{ p: 1.2, borderRadius: 1, m: 1 }}>
              <Typography variant={"body1"}>Annonce</Typography>
            </Box> */}
          </Link>
        </Box>
        <Box>
        <Link
            href={"/"}
            className={classes.btnLink}
            variant="button"
            sx={{ color: "#cad4ed", cursor: "pointer", textDecoration: "none" }}
          >
            <CustomButton style={{backgroundColor:"#ffffff40"}}>View Site</CustomButton>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
