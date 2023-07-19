import { Typography } from "@mui/material";
import { LocalGasStation, EvStation } from "@mui/icons-material";
import { TbManualGearbox } from "react-icons/tb";
import { BiUpArrowAlt } from "react-icons/bi";

type CarburantTypes = {
  label: JSX.Element | string;
  value: string;
};

type BoiteVitesseTypes = CarburantTypes;

const Essence = () => (
  <Typography sx={{ display: "flex", alignItems: "center" }}>
    <LocalGasStation /> Essence
  </Typography>
);

const Gazoil = () => (
  <Typography sx={{ display: "flex", alignItems: "center" }}>
    <LocalGasStation /> Gazoil
  </Typography>
);

const ELectrique = () => (
  <Typography sx={{ display: "flex", alignItems: "center" }}>
    <EvStation /> ELectrique
  </Typography>
);
const Hybride = () => (
  <Typography sx={{ display: "flex", alignItems: "center" }}>
    <LocalGasStation />+<EvStation /> Hybride
  </Typography>
);

const CARBURANTS: CarburantTypes[] = [
  {
    label: <Essence />,
    value: "essence",
  },
  {
    label: <Gazoil />,
    value: "gazoil",
  },
  {
    label: <ELectrique />,
    value: "electrique",
  },
  {
    label: <Hybride />,
    value: "hybride",
  },
];

const Automatic = () => (
  <Typography sx={{ display: "flex", alignItems: "center" }}>
    Automatic
  </Typography>
);

const Manual = () => (
  <Typography sx={{ display: "flex", alignItems: "center" }}>
    <TbManualGearbox size={24} /> Manualle
  </Typography>
);

const BOITEVITESSES: BoiteVitesseTypes[] = [
  {
    label: <Manual />,
    value: "manuelle",
  },
  {
    label: <Automatic />,
    value: "automatique",
  },
];

export { CARBURANTS, BOITEVITESSES };
