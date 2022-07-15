import React, { useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import BodyTop from "../components/BodyTop";
import InputValue from "../components/InputValue";
import axios from "axios";

const OwnerStoreNamePage = () => {
  const navigate = useNavigate();
  
  const [value, setValue] = useState("");

  function onClickToNext() {
    navigate('/owner/storelocation');
  }
  
  return (
    <>
      <Header title="회원가입" />
      <BodyTop title="매장이름" />
      <div id="search" className="m-8 mt-10">
        <p className="text-lg mb-5 font-bold">매장이름을 설정해주세요</p>
        <InputValue value={value} setValue={setValue} title="매장이름 입력"/>
        <Button title="완료" onClickEvent={onClickToNext}/>
      </div>
    </>
  );
};

export default OwnerStoreNamePage;
