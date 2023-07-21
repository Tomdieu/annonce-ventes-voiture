import React from "react";
import { Typography, Box, TextField, Button, Theme } from "@mui/material";

import { makeStyles } from "@mui/styles";
import Footer from "../components/Footer";
import Header from "../components/Header";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    width: "100vw",
    height: "100vh",
    position: "relative",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    maxWidth: 500,
    margin: "0 auto",
  },
}));

const ContactPage = () => {
  const classes = useStyles();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Box className={classes.container}>
      <Box sx={{ mb: 8 }}>
        <Header />
      </Box>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Us
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField label="Name" variant="outlined" required />
        <TextField label="Email" variant="outlined" required type="email" />
        <TextField
          label="Message"
          variant="outlined"
          required
          multiline
          rows={4}
        />
        <Button type="submit" size="large" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <Box sx={{mb:5}}></Box>
      <Footer />
    </Box>
  );
};

export default ContactPage;
