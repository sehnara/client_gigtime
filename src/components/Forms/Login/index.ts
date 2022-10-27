import Login from "../../../services/login";
import config from '../../../config.js'  

export default class LoginForm{
    constructor(){
    }
    
    login(id : string, pwd : string){
        const login = new Login(config.SERVER_URL)
        login.login(id, pwd).then(res => {
        if(res.length === 1){
            localStorage.setItem('user', res[0])
            return res[0].worker
        }
        else{
            alert('fuck you')
        }
        })
    }

}
