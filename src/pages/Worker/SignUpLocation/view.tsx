import React  from "react";
import { useNavigate } from "react-router-dom";
import { SignUpWorkerState } from "../../../context/signUpWork";

import Button from "../../../components/Buttons/Normal/view";
import Header from "../../../components/Header/view";
import AddressSearch from "../../../components/Address/view";
import SignUpForm from "../../../components/Forms/SignUp/view";

const SignUpLocation = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans">
      <Header title="회원가입" />
      <div id="search" className="m-8 ">
        <SignUpForm title="아이디" placeholder="아이디 입력해주세요" mode="id" state={SignUpWorkerState}/>
        <SignUpForm title="비밀번호" placeholder="비밀번호 입력해주세요" mode="password" state={SignUpWorkerState}/>
        <AddressSearch mode={'address'} state={SignUpWorkerState} label={'주소'}/>
        <Button title="다음" onClickEvent={()=>navigate("/worker/distance")} />
      </div>
    </div>
  );
};

export default SignUpLocation;
