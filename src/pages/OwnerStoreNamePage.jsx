import React from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const OwnerStoreNamePage = () => {
  const navigate = useNavigate();
  
  function onClickToNext() {
    navigate('/owner/storelocation');
  }
  
  return (
    <>
      <Header title="회원가입"/>
      <div>storename</div>
      <Button title="완료" onClickEvent={onClickToNext}/>
    </>
  );
};

export default OwnerStoreNamePage;
