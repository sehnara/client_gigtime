import React from "react";
import { useNavigate } from "react-router-dom";

const InputLogin = (): JSX.Element => {
  const navigate = useNavigate(); // 전역 지정

  const onSubmit = () => {
    navigate("/worker/home");
  };

  return (
    <div>
      <form className="flex flex-col mt-3" onSubmit={onSubmit}>
        <input className="flex flex-col mt-1 h-8 p-2" type="text" />
        <input className="flex flex-col mt-1 h-8 p-2" type="password" />
        <button type="submit">로그인</button>
      </form>
      <div className="flex">
        <input type="checkbox" />
        <button onClick={() => {}}>회원가입</button>
      </div>
    </div>
  );
};

export default InputLogin;
