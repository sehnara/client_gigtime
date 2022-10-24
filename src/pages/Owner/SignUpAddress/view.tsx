import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/Buttons/Normal/view";
import Header from "../../../components/Header/view";
import AddressSearch from "../../../components/Address/view";
import { SignUpState } from "../../../context/signUp";

const SignUpAddressPage = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans">
      <Header title="회원가입" />
      <div id="search" className="m-8 mt-10">
        <p className="text-sm mb-5">매장 주소를 설정해주세요</p>
        <AddressSearch mode={'address'}state={SignUpState} />
        <Button title="다음" onClickEvent={()=>{ navigate("/owner/jobtype")}} />
      </div>
    </div>
  );
};

export default SignUpAddressPage;
