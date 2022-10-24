import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const InputLogin = (): JSX.Element => {
  const navigate = useNavigate()
  const [id, setId] = useState<string|null>('')
  const [pwd, setPwd] = useState<string|null>('')

  const onSubmit = () => {
    // 1. 내부 저장소에 저장해놓자. 재로그인 없애려면
    // 2. 사장님인지 직원인지 확인하는 로직 필요
    navigate("/worker/home");
  };

  const goSignUp = () => {
    navigate('./signUp')
  }

  return (
    <div>
      <form className="flex flex-col mt-3" onSubmit={onSubmit}>
        <input className="flex flex-col mt-1 h-8 p-2" type="text" onChange={(e) => {setId(e.currentTarget.value)}}/>
        <input className="flex flex-col mt-1 h-8 p-2" type="password" onChange={(e) => {setPwd(e.currentTarget.value)}} />
        <div className="flex flex-col">
          <button className="mt-1 h-8 p2 rounded-s border-2" type="submit">로그인</button>
          <button className="mt-1 h-8 p2 rounded-s border-2" onClick={() => {goSignUp()}}>회원가입</button>
        </div>
      </form>
    </div>
  );
};

export default InputLogin;
