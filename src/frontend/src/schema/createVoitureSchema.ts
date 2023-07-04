import * as yup from "yup"

export default yup.object().shape({
    annee: yup.number().required("Annee de sortie obligatoire").min(1994,"L'annee doit extre superieur or egale a  1994").max(new Date().getFullYear(),"L'annee doit etre inferieur ou egale a l'annee courante "+new Date().getFullYear()),
    num_chassi: yup.string().required("Numeros Chassi obligatoire").length(6, "le numero de chassi doit avoir 6 chiffre"),
    km_parcouru: yup.number().required("Km parcourus obligatoire").min(0, "km parcouru doit etre > 0 km"),
    prix: yup.number().required("Prix du vehicule obligatoire").min(0, "le prix ne doit pas etre < 0 XAF"),
    description: yup.string().required("Description obligatoire"),
    modele: yup.string().required("Modele du vehicule obligatoire"),
})