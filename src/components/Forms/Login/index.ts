import Login from "../../../services/login";
import config from '../../../config.js'  
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default class LoginForm{
    login;
    navigate;

    constructor(){
        this.navigate = useNavigate()
        this.login = new Login(config.SERVER_URL)
    }
    
    onLogin(id : string, pwd : string){
        const login = new Login(config.SERVER_URL)
        login.login(id, pwd)
        .then(result => {
          localStorage.setItem('token', result)
        })
        .then(()=>{
          const token = localStorage.getItem('token')
          const isWorker = jwtDecode(token!).worker
          if(isWorker){
            this.navigate('./worker/home')
          }
          else{
            this.navigate('./owner/mypage')
          }
        })
    }

    goSignUpPage(){
        this.navigate('./signUp')
    }
}
