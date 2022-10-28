import Login from "../../../services/login";
import config from '../../../config.js'  
import jwtDecode from "jwt-decode";


export default class LoginForm{
    login;

    constructor(){
        this.login = new Login(config.SERVER_URL)
    }
    
    async onLogin(id : string, pwd : string):Promise<boolean>{
        const login = new Login(config.SERVER_URL)

        const result = await login.login(id, pwd)
        localStorage.setItem('token', result)
        const isWorker = jwtDecode(result).worker
        return isWorker ? true : false
    }
}
