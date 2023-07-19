import { Box, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    width: "100vw",
    height: "10vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <CircularProgress thickness={4} size={80} />
    </Box>
  );
};

export default Loading;
