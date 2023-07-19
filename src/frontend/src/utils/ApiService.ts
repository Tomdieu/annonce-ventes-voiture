export default class ApiService {
  static API_URL = "http://localhost:8000/api/";
  static async login(data: string) {
    const url = this.API_URL + "accounts/login/";
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
    });
    return res;
  }
  static async register(data: string) {
    const url = this.API_URL + "accounts/register/";
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
    });
    return res;
  }
  //   Voiture
  static async createVoiture(data: FormData, token: string) {
    const url = this.API_URL + "core/voiture/";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `token ${token}`,
      },
      body: data,
    });
    return res;
  }
  static async listVoiture(token: string, queryParams = "") {
    let url = this.API_URL + `core/voiture/`;
    url = queryParams ? url + `?${queryParams}` : url
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }
  static async getVoiture(id: number, token: string) {
    const url = this.API_URL + `core/voiture/${id}/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }
  static async updateVoiture(id: number, data: FormData, token: string) {
    const url = this.API_URL + `core/voiture/${id}/`;
    const res = await fetch(url, {
      method: "PATCH",
      body: data,
      headers: {
        Authorization: `token ${token}`,
      },
    });
    return res;
  }
  static async updateVoitureImage(imageId: number, data: FormData, token: string) {
    const url = this.API_URL + `core/image-voiture/${imageId}/`;
    const res = await fetch(url, {
      method: "PATCH",
      body: data,
      headers: {
        Authorization: `token ${token}`,
      },
    });
    return res;
  }
  static async addVoitureImage(voitureId: number, data: FormData, token: string) {
    const url = this.API_URL + `core/voiture/${voitureId}/add_images/`;
    const res = await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        Authorization: `token ${token}`,
      },
    });
    return res;
  }
  static async deleteVoiture(id: number, token: string) {
    const url = this.API_URL + `core/voiture/${id}/`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }
  static async deleteVoitureImage(id: number, token: string) {
    const url = this.API_URL + `core/image-voiture/${id}/`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `token ${token}`,
      },
    });
    return res;
  }

  // Annonce
  static async createAnnonce(data: string, token: string) {
    const url = this.API_URL + "core/annonce/";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      body: data,
    });
    return res;
  }

  static async listAnnonces(queryParams = "") {
    let url = this.API_URL + `core/annonces/`;
    url = queryParams ? url + `?${queryParams}` : url
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  }
  static async listAnnonce(token: string, queryParams = "") {
    let url = this.API_URL + `core/annonce/`;
    url = queryParams ? url + `?${queryParams}` : url
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }
  static async getAnnonces(id: number) {
    const url = this.API_URL + `core/annonces/${id}/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  }
  static async getAnnonce(id: number, token: string) {
    const url = this.API_URL + `core/annonce/${id}/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }
  static async updateAnnonce(id: number, data: string, token: string) {
    const url = this.API_URL + `core/annonce/${id}/`;
    const res = await fetch(url, {
      method: "PATCH",
      body: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }
  static async deleteAnnonce(id: number, token: string) {
    const url = this.API_URL + `core/annonce/${id}/`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }

  //   Marque

  static async createMarque(data: string, token: string) {
    const url = this.API_URL + "core/marque/";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      body: data,
    });
    return res;
  }
  static async listMarque(token: string) {
    const url = this.API_URL + `core/marque/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }
  static async getMarque(id: number, token: string) {
    const url = this.API_URL + `core/marque/${id}/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }
  static async updateMarque(id: number, data: string, token: string) {
    const url = this.API_URL + `core/marque/${id}/`;
    const res = await fetch(url, {
      method: "PATCH",
      body: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }
  static async deleteMarque(id: number, token: string) {
    const url = this.API_URL + `core/marque/${id}/`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }
  //   modele
  static async createModele(data: string, token: string) {
    const url = this.API_URL + "core/modele/";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      body: data,
    });
    return res;
  }
  static async listModele(token: string) {
    const url = this.API_URL + `core/modele/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }
  static async getModele(id: number, token: string) {
    const url = this.API_URL + `core/modele/${id}/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }
  static async updateModele(id: number, data: string, token: string) {
    const url = this.API_URL + `core/modele/${id}/`;
    const res = await fetch(url, {
      method: "PATCH",
      body: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }
  static async deleteModele(id: number, token: string) {
    const url = this.API_URL + `core/modele/${id}/`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return res;
  }
}
