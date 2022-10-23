import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const InputLogin = (): JSX.Element => {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [pwd, setPwd] = useState('')

  const onSubmit = () => {
    console.log(id, pwd)
    // navigate("/worker/home");
  };

  const goSignUpPage = () => {
    navigate('./signUp')
  }

  return (
    <div>
      <form className="flex flex-col mt-3" onSubmit={onSubmit}>
        <input className="flex flex-col mt-1 h-8 p-2" type="text" onChange={(e) => {setId(e.currentTarget.value)}}/>
        <input className="flex flex-col mt-1 h-8 p-2" type="password" onChange={(e) => {setPwd(e.currentTarget.value)}} />
        <div className="flex flex-col">
          <button className="mt-1 h-8 p2 rounded-s border-2" type="submit">로그인</button>
          <button className="mt-1 h-8 p2 rounded-s border-2" onClick={() => {goSignUpPage()}}>회원가입</button>
      </div>
      </form>
    </div>
  );
};

export default InputLogin;
