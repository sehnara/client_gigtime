import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/Buttons/Normal/view";
import Header from "../../../components/Header/view";
import AddressSearch from "../../../components/Address/view";

import { SignUpState } from "../../../context/signUp";
import { checkEmptyForm } from ".";
import { useRecoilValue } from "recoil";
import SignDataType from "../../../context/interfaces/SignUpType";

const SignUpAddressPage = () => {
  const navigate = useNavigate();
  const signData = useRecoilValue<SignDataType>(SignUpState)
  
  function goNextStep() {
    const isFulfilled = checkEmptyForm(signData)
    if(isFulfilled){
      navigate('/owner/jobtype');
    }
    else{
      alert('아래 정보를 모두 기입해주세요')
    }
  } 

  return (
    <div className="font-sans">
      <Header title="회원가입" />
      <div id="search" className="m-8 mt-10">
        <p className="text-sm mb-5">매장 주소를 설정해주세요</p>
        <AddressSearch mode={'address'} state={SignUpState} />
        <Button title="다음" onClickEvent={goNextStep} />
      </div>
    </div>
  );
};

export default SignUpAddressPage;
