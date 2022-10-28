import axios from "axios";

export default class Login {
    baseURL: string;
    
    constructor(baseURL:string){
        this.baseURL = baseURL
    }

    async login(id:string, password:string){
        const response = await axios.post(`${this.baseURL}/auth/login/`, {           
            id,
            password
        });
        const data = response.data
        if(response.status !== 200) {
            return data.message
        }else{
            return data
        }    
    }
}