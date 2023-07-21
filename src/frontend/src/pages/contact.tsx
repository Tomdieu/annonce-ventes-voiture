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
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get("name").toString();
    const email = formData.get("email").toString();
    const message = formData.get("message").toString();

    const mailtoLink = `mailto:ivan.tomdieu@gmail.com?subject=New message from ${encodeURIComponent(
      name
    )}&body=${encodeURIComponent(
      message
    )}%0D%0A%0D%0AFrom: ${encodeURIComponent(email)}`;

    window.location.href = mailtoLink;
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
        <TextField name="name" label="Name" variant="outlined" required />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          required
          type="email"
        />
        <TextField
          name="message"
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
      <Box sx={{ mb: 5 }}></Box>
      <Footer />
    </Box>
  );
};

export default ContactPage;
