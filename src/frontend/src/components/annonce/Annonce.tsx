import React from "react"
import { AnnonceTypes } from "../../types"
import getElapsedTime from "../../utils/getElapsedTime"
import capitalizeText from "../../utils/capitalizeText"
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Theme,
    Box,
    Divider
} from '@mui/material';
import millify from "millify"
import { makeStyles } from "@mui/styles"
import { LocationOn, LocalGasStation } from '@mui/icons-material';
import { TbManualGearbox } from "react-icons/tb"
type Props = {
    annonce: AnnonceTypes
}

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        marginBottom: theme.spacing(1),
        cursor: 'pointer'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9 aspect ratio
    },
    description: {
        maxHeight: '4.5em', // Adjust the maximum height to fit your desired number of lines
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        '-webkit-line-clamp': 3, // Adjust the number of lines to fit your desired number
        '-webkit-box-orient': 'vertical',
    },
}));


const Annonce: React.FC<Props> = (props: Props) => {
    const { annonce } = props
    const classes = useStyles();


    return (
        <Card key={annonce.titre} className={classes.card}>
            <CardMedia
                className={classes.media}
                image={annonce.voiture.images[0]?.photo} // Assuming the first image represents the car
                title={annonce.voiture.model.marque.nom + " " + annonce.voiture.model.nom}
            />
            <CardContent sx={{
                position: "relative", backgroundColor: "#69aefcde" }}>
            <Typography variant="h5" component="h2">
                {capitalizeText(annonce.titre)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Voiture : {annonce.voiture.model.marque.nom} {annonce.voiture.model.nom}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Prix: {annonce.prix} FCFA
            </Typography>

            <Typography variant="body2" color="textSecondary">
                Propriétaire: {annonce.voiture.proprietaire.first_name} {annonce.voiture.proprietaire.last_name}  ({annonce.voiture.proprietaire.username})
            </Typography>

            <Typography variant="body2" color="textSecondary">
                <span style={{ display: "flex", alignItems: "center" }}><LocationOn sx={{ width: 20 }} /> {capitalizeText(annonce.address)}</span>
            </Typography>
            <Box sx={(theme) => ({ position: 'absolute', left: 5, top: -30, backgroundColor: "#84b7f1c9", borderRadius: theme.shape.borderRadius, p: theme.spacing(.5) })}>

                <Typography variant="body2" color="textSecondary">
                    {getElapsedTime(annonce.date_creation)}
                </Typography>
            </Box>
            <Box sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
            }}>
                <Typography variant="body2" color="text.secondary">{annonce.voiture.annee}</Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="body2" color="text.secondary">
                    {millify(annonce.voiture.km_parcouru * 1000, {
                        units: ["m", "km", "mi", "ft"],
                        space: true,
                    })}
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="body2" color="text.secondary">
                    <span style={{ display: "flex", alignItems: "center" }}>
                        <LocalGasStation />
                        {capitalizeText(annonce.voiture.type_carburant)}
                    </span>
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="body2" color="text.secondary">
                    <span style={{ display: "flex", alignItems: "center" }}>
                        <TbManualGearbox style={{ width: 20, height: 20 }} />
                        {capitalizeText(annonce.voiture.boite_vitesse)}
                    </span>
                </Typography>
            </Box>
        </CardContent>
        </Card >
    )
}

export default Annonce