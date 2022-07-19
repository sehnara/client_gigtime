import React from "react";
import KakaoLoginButton from "../components/KakaoLoginButton";

const InitPage = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="font-oxanium text-6xl text-teal-500">GigTime</h1>
      <KakaoLoginButton />
    </div>
  );
};

export default InitPage;
