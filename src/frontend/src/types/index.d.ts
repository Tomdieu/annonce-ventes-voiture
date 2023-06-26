export interface _ModeleTypes {
    id: number;
    nom: string;
    type: "electrique" | "essence" | "diesele",
}
export interface ModeleTypes {
    id: number;
    nom: string;
    type: "electrique" | "essence" | "diesele",
    marque?:_MarqueTypes;
}
export interface _MarqueTypes {
    id: number;
    nom: string;

}

export interface MarqueTypes {
    id: number;
    nom: string;
    modeles?:_ModeleTypes[]

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
    usename:string;
}

export interface VoitureTypes {
    id:number;
    annee:number;
    prix:number;
    description:string;
    num_chassi:string;
    km_parcouru:number;
    model:ModeleTypes;
    proprietaire:UserTypes;
    images:ImageTypes[]
}