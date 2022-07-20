import React from "react";
import KakaoLoginButton from "../components/KakaoLoginButton";

const InitPage = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="font-jua text-6xl text-cyan-500">바로알바</h1>
      <KakaoLoginButton />
    </div>
  );
};

export default InitPage;
