import { Box, BoxProps, CircularProgress } from "@mui/material";
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

type LoadingProps = BoxProps;

const Loading = (props:LoadingProps) => {
  const classes = useStyles();
  const {...others} = props;
  return (
    <Box className={classes.container} {...others}>
      <CircularProgress variant="indeterminate" thickness={4} size={100} />
    </Box>
  );
};

export default Loading;
