import React from "react";

import { Box, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <CircularProgress
        className={classes.progressBar}
        thickness={4}
        size={80}
      />
    </Box>
  );
};

export default Loading;
