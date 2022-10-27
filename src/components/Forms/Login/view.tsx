import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../../../services/login";
import config from '../../../config.js'

const InputLogin = (): JSX.Element => {
  const navigate = useNavigate()
  const [id, setId] = useState<string>('')
  const [pwd, setPwd] = useState<string>('')

  const onSubmit = () => {
    const login = new Login(config.SERVER_URL)
    login.login(id, pwd).then(res => {
      if(res.length === 1){
        localStorage.setItem('user', JSON.stringify(res[0]))
        if(res[0].worker){
          navigate("/worker/home");
        }
        else{
          navigate("/owner/mypage");
        }
      }
      else{
        alert('fuck you')
      }
    })
  };

  return (
    <div>
      <input className="flex flex-col mt-1 h-8 p-2" type="text" onChange={(e) => {setId(e.currentTarget.value)}}/>
      <input className="flex flex-col mt-1 h-8 p-2" type="password" onChange={(e) => {setPwd(e.currentTarget.value)}} />
      <div className="flex flex-col">
        <button className="mt-1 h-8 p2 rounded-s border-2" onClick={()=>{onSubmit()}}>로그인</button>
        <button className="mt-1 h-8 p2 rounded-s border-2" onClick={() => navigate('./signUp')}>회원가입</button>
      </div>
    </div>
  );
};

export default InputLogin;
