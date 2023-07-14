export interface _ModeleTypes {
    id: number;
    nom: string;
}
export interface ModeleTypes {
    id: number;
    nom: string;
    marque:_MarqueTypes;
}
export interface _MarqueTypes {
    id: number;
    nom: string;

}

export interface MarqueTypes {
    id: number;
    nom: string;
    modeles:_ModeleTypes[]

}


export interface ImageTypes {
    id:number;
    photo: string;
}

export interface UserTypes{
    id:number;
    email: string;
    address:string;
    first_name:string;
    last_name:string;
    phone_1:string;
    phone_2:string;
    username:string;
}

export interface VoitureTypes {
    nombre_de_place: number;
    id:number;
    annee:number;
    prix:number;
    description:string;
    num_chassi:string;
    km_parcouru:number;
    model:ModeleTypes;
    proprietaire:UserTypes;
    images:ImageTypes[];
    boite_vitesse:string;
    couleur:string;
    nombre_de_chevaux:string;
    plaque_immatriculation?:string;
    type_carburant:string;
    type_vehicule:string;
    traction:string;
}

export interface LocationTypes {
    label: string;
    latitude: number;
    longitude: number;
  };


export interface AnnonceTypes {
    titre:string;
    description:string;
    status:string;
    prix:number;
    voiture:VoitureTypes;
    latitude:number;
    longitude:number;
    address:string;
    date_creation:string
}