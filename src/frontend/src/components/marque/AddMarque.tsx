import { Dialog, Button, TextField, Box } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import ApiService from "../../utils/ApiService";
type Props = {
  open: boolean;
  onClose: (value: boolean) => void;
  onCreate: (data: any) => void;
};

const AddMarque = (props: Props) => {
  const { userToken } = useAuth();
  const [nom, setNom] = useState("");
  const { open, onClose, onCreate } = props;

  const createMarque = () => {
    ApiService.createMarque(JSON.stringify({nom}), userToken)
      .then((res) => res.json())
      .then((data) => onCreate(data))
      .catch((err) => console.log(err))
      .finally(() => onClose(false));
  };
  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      sx={{ width: "100vw", height: "100vh" }}
    >
      <DialogTitle>Ajouter Une Marque</DialogTitle>
      <DialogContent sx={{ width: "500px" }}>
        <DialogContentText></DialogContentText>
        <Box
          component={"form"}
          sx={{ display: "flex", gap: 2, mt: 1, flexDirection: "column" }}
          onSubmit={() => createMarque()}
        >
          <TextField
            autoFocus
            id="nom"
            label="Nom de la marque"
            type="text"
            fullWidth
            variant="outlined"
            value={nom}
            required
            sx={{ fontSize: "28px" }}
            onChange={(e) => setNom(e.target.value)}
          />
          <DialogActions>
            <Button
              onClick={() => onClose(false)}
              color="error"
              variant={"contained"}
            >
              Cancel
            </Button>
            <Button type="submit" variant={"contained"}>
              Ajouter
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddMarque;
