export default class ApiService{
    static API_URL = 'http://localhost:8000/api/'
    static async login(data:any){
        const url = this.API_URL + "accounts/login/"
        const res = await fetch(url,{headers:{'Content-Type':'application/json'},body:data})
        return res
    }
    static async register(data:any){
        const url = this.API_URL + "accounts/register/"
        const res = await fetch(url,{headers:{'Content-Type':'application/json'},body:data})
        return res
    }
}