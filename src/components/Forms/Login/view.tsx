import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from ".";

const InputLogin = (): JSX.Element => {
  const navigate = useNavigate()

  const [id, setId] = useState<string>('')
  const [pwd, setPwd] = useState<string>('')
  const login = new LoginForm()

  const onSubmit = async () => {
    const isWorker = await login.onLogin(id, pwd)
    if(isWorker){
      navigate('./worker/home')
    }
    else{
      navigate('./owner/mypage')
    }
  };

  const goSignUpPage = ()=>{
    navigate('./signUp')
  }

  return (
    <div>
      <input className="flex flex-col mt-1 h-8 p-2" type="text" onChange={(e) => {setId(e.currentTarget.value)}}/>
      <input className="flex flex-col mt-1 h-8 p-2" type="password" onChange={(e) => {setPwd(e.currentTarget.value)}} />
      <div className="flex flex-col">
        <button className="mt-1 h-8 p2 rounded-s border-2" onClick={onSubmit}>로그인</button>
        <button className="mt-1 h-8 p2 rounded-s border-2" onClick={goSignUpPage}>회원가입</button>
      </div>
    </div>
  );
};

export default InputLogin;
