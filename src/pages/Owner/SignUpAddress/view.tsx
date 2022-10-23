import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Buttons/Normal/view";
import Header from "../../../components/Header/view";
import AddressSearch from "../../../components/Address/view";
// import { useSelector } from "react-redux";

const SignUpAddressPage = () => {

  const navigate = useNavigate();
//   const state = useSelector((state) => state);
  function onClickToNext() {
    navigate("/owner/jobtype");
  }

  return (
    <div className="font-sans">
      <Header title="회원가입" />
      <div id="search" className="m-8 mt-10">
        <p className="text-sm mb-5">매장 주소를 설정해주세요</p>
        <AddressSearch mode={"OWNER"} />
        <Button title="다음" onClickEvent={onClickToNext} />
      </div>
    </div>
  );
};

export default SignUpAddressPage;
