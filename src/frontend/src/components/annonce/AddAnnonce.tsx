import {
  Dialog,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Grid,
  Divider,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import ApiService from "../../utils/ApiService";
import { Save, Close, Add, Delete } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

import { Formik, Form } from "formik";

import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


type Props = {
    open: boolean;
  onClose: (value: boolean) => void;
  onCreate: (data: any) => void;
}

const SingletonAddAnnonce = (props:Props) => {
    const {open,onClose,onCreate} =props
    const handleClose = () => {
        onClose(false);
      };
    
    return (
        <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >

      </Dialog>
    )
}