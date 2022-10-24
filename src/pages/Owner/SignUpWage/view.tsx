import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/Buttons/Normal/view";
import Header from "../../../components/Header/view";
import SignUpForm from "../../../components/Forms/SignUp/view";
import { SignUpState } from "../../../context/signUp";

function SignUpWage() {
  const navigate = useNavigate();
  
  return (
    <>
      <Header title="회원가입" />
      <div id="search" className="m-8">
        <div className="flex mb-5">
          <div className="pt-2">
            <p className="text-sm mb-1">최저시급 설정</p>
            <p className="text-slate-500 text-xs text-red-500">*알바생에게 가게 정보 노출 시 설정하신 최저시급 정보가 포함됩니다.</p>
          </div>
        </div>
        <SignUpForm
          title=""
          placeholder={"최저시급 입력하기"}
          mode="pay"
          state={SignUpState}
        />
        <Button onClickEvent={()=>navigate("/owner/complete")} title="회원가입 완료" />
      </div>
    </>
  );
}

export default SignUpWage;
