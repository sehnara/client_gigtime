import axios from "axios";
import SignDataType from "../context/interfaces/SignUpType";
import SignUpWorkerType from "../context/interfaces/SignUpWorkType";

export default class SignUp {
    baseURL: string;
    
    constructor(baseURL:string){
        this.baseURL = baseURL
    }

    async signUpOwner(signData : SignDataType){
        const {id, password, name, phone, address, category, description, pay} = signData

        const response = await axios.post(`${this.baseURL}/auth/signup/owner`, {           
            id, password, name, phone, address, category, description, pay
        });
        const data = response.data

        if(response.status !== 200) {
            return data.message
        }else{
            return data
        }    
    }

    async signUpWorker(signData : SignUpWorkerType){
        const {id, password, address, distance} = signData

        const response = await axios.post(`${this.baseURL}/auth/signup/worker`, {           
            id, password, address, distance
        });
        const data = response.data

        if(response.status !== 200) {
            return data.message
        }else{
            return data
        }    
    }
}