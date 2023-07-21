import { makeStyles } from '@mui/styles';

import {Theme} from "@mui/material"

const useStyles = makeStyles((theme:Theme) => ({
  h1: {
    fontSize: '5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5rem',
    },
    fontWeight:"bold"
  },
  h2: {
    fontSize: '3rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
  h3: {
    fontSize: '2.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.8rem',
    },
  },
  h4: {
    fontSize: '2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.6rem',
    },
  },
  h5: {
    fontSize: '1.8rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.4rem',
    },
  },
  h6: {
    fontSize: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
    },
  },
  subtitle1: {
    fontSize: '1.2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  subtitle2: {
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },
  body1: {
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },
  body2: {
    fontSize: '0.9rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
  },
  inherit: {
    fontSize: 'inherit',
  },
}));


export {useStyles};