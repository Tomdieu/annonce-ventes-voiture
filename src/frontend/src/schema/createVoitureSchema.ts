import * as yup from "yup"

export default yup.object().shape({
    annee:yup.string().required("Annee de sortie obligatoire").length(4,"Example d'annee de sortie (2022)"),
    num_chassi:yup.string().required("NUm Chassi obligatoire").length(6,"le numero de chassi requis 6 nombre"),
    km_parcouru:yup.number().required("Km parcourus obligatoire").min(0,"km parcouru doit etre > 0 km"),
    prix:yup.number().required("Prix du vehicule obligatoire").min(0,"le prix ne doit pas etre < 0 XAF"),
    description:yup.string().required("Description obligatoire"),
    modele:yup.string().required("Modele du vehicule obligatoire"),
    // photos:yup.array().min(1,"Selectionner au moin une(1) image").of(yup.mixed().test('fileSize','File Size is too large',(value)=>value && value.size<=5000000))
})