import millify from "millify"
import * as yup from "yup"
export default yup.object().shape({
    titre: yup.string().required("Le Titre de l'annonce est obligatoire"),
    description: yup.string().required("La description est obligatoire"),
    prix: yup.number().min(100000, 'Le prix doit être supérieur à '+millify(100000,{space:true})+' XAF').max(10000000000,"Le prix max c'est "+millify(10000000000,{space:true})+' XAF').required("La prix est obligatoire"),
    voiture: yup.number().required("La Voiture est obligatoire. selectionner au moin une"),
    latitude: yup.number(),
    longitude: yup.number(),
    address: yup.string().required("L'address est obligatoire")
})