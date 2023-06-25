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


export interface VoitureTypes {
    annee:number;
    prix:number;
    description:string;
    num_chassi:string;
    km_parcouru:string;
    model:ModeleTypes;
    proprietaire:any
}