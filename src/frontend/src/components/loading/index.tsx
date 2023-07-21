import { Box, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
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
      <CircularProgress variant="indeterminate" thickness={4} size={100} />
    </Box>
  );
};

export default Loading;
