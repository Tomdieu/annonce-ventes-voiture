export interface _ModeleTypes {
    id: number;
    nom: string;
}
export interface ModeleTypes {
    id: number;
    nom: string;
    marque: _MarqueTypes;
}
export interface _MarqueTypes {
    id: number;
    nom: string;
    logo:string;

}

export interface MarqueTypes {
    id: number;
    nom: string;
    logo:string;
    modeles: _ModeleTypes[]

}


export interface ImageTypes {
    id: number;
    photo: string;
}

export interface UserTypes {
    id: number;
    email: string;
    address: string;
    first_name: string;
    last_name: string;
    phone_1: string;
    phone_2: string;
    username: string;
}

export type VoitureTypes =  {
    nombre_de_place: number;
    id: number;
    annee: number;
    prix: number;
    description: string;
    num_chassi: string;
    km_parcouru: number;
    model: ModeleTypes;
    proprietaire: UserTypes;
    images: ImageTypes[];
    boite_vitesse: string;
    couleur: string;
    nombre_de_chevaux: string;
    plaque_immatriculation?: string;
    type_carburant: string;
    type_vehicule: string;
    traction: string;
}

export interface AnnonceTypes {
  id:number;
  titre: string;
  description: string;
  status: string;
  prix: number;
  voiture: VoitureTypes;
  latitude: number;
  longitude: number;
  address: string;
  date_creation: string
}

export type LocationTypes =  {
    label: string;
    latitude: number;
    longitude: number;
}




export interface _AnnonceTypes {
    id:number;
    titre: string;
    description: string;
    status: string;
    prix: string|number;
    voiture: string;
    latitude: number;
    longitude: number;
    address: string;
    date_creation: string;
}

export type FetchError = {
    status: number;
    statusText: string;
    url: string;
    message: string;
  };


  export type GeoapifyResponse = {
    type: string;
    features: Feature[];
    query: {
      text: string;
      parsed: {
        city: string;
        expected_type: string;
      };
    };
  };
  
  type Feature = {
    type: string;
    properties: {
      datasource: {
        sourcename: string;
        attribution: string;
        license: string;
        url: string;
      };
      country: string;
      country_code: string;
      state: string;
      county: string;
      city: string;
      lon: number;
      lat: number;
      state_code: string;
      formatted: string;
      address_line1: string;
      address_line2: string;
      category: string;
      timezone: {
        name: string;
        name_alt: string;
        offset_STD: string;
        offset_STD_seconds: number;
        offset_DST: string;
        offset_DST_seconds: number;
        abbreviation_STD: string;
        abbreviation_DST: string;
      };
      plus_code: string;
      plus_code_short: string;
      result_type: string;
      rank: {
        importance: number;
        confidence: number;
        confidence_city_level: number;
        match_type: string;
      };
      place_id: string;
    };
    geometry: {
      type: string;
      coordinates: [number, number];
    };
    bbox: [number, number, number, number];
  };
  