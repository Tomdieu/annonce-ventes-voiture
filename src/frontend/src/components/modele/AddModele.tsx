import {
  Dialog,
  Button,
  TextField,
  Box,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import ApiService from "../../utils/ApiService";
import { MarqueTypes, ModeleTypes } from "../../types";
import { Save, Close } from "@mui/icons-material";

type Props = {
  open: boolean;
  onClose: (value: boolean) => void;
  onCreate: (data: ModeleTypes) => void;
};

const types = ["electrique", "essence", "diesele"];

const AddModel = (props: Props) => {
  const { userToken } = useAuth();
  const [nom, setNom] = useState("");
  const [marque, setMarque] = useState("");
  const [type, setType] = useState("");

  const [marques, setMarques] = useState<MarqueTypes[]>([]);
  const { open, onClose, onCreate } = props;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ApiService.listMarque()
        .then((res) => res.json())
        .then((data:MarqueTypes[]) => setMarques(data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
  }, []);

  const createModele = () => {
    ApiService.createModele(JSON.stringify({nom,type,marque}), userToken)
      .then((res) => res.json())
      .then((data) => onCreate(data as ModeleTypes))
      .catch((err) => console.log(err))
      .finally(() => onClose(false));
  };
  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      sx={{ width: "100vw", height: "100vh" }}
    >
      <DialogTitle>Ajouter Un Modele</DialogTitle>
      <DialogContent sx={{ width: "500px" }}>
        <DialogContentText></DialogContentText>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{ display: "flex", gap: 2, mt: 1, flexDirection: "column" }}
            component={"form"}
            onSubmit={() => createModele()}
          >
            <TextField
              autoFocus
              id="nom"
              label="Nom du modele"
              type="text"
              fullWidth
              variant="outlined"
              value={nom}
              required
              sx={{ fontSize: "28px" }}
              onChange={(e) => setNom(e.target.value)}
            />
            <TextField
              autoFocus
              id="type"
              label="Type"
              type="text"
              fullWidth
              variant="outlined"
              value={type}
              required
              sx={{ fontSize: "28px" }}
              select
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value={""}>Select the type</MenuItem>
              {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              autoFocus
              id="marque"
              label="Marque"
              type="text"
              fullWidth
              variant="outlined"
              value={marque}
              required
              sx={{ fontSize: "28px" }}
              select={marques.length > 0?true:false}
              onChange={(e) => setMarque(e.target.value)}
            >
              {marques.length > 0 &&
                marques?.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.nom}
                  </MenuItem>
                ))}
            </TextField>
            <DialogActions>
              <Button
                onClick={() => onClose(false)}
                color="error"
                variant={"contained"}
                startIcon={<Close />}
              >
                Close
              </Button>
              <Button type="submit" variant={"contained"} endIcon={<Save />}>
                Ajouter
              </Button>
            </DialogActions>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddModel;
