import React, { useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import BodyTop from "../components/BodyTop";
import InputValue from "../components/InputValue";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setPhone, setStoreName } from "../module/slices/owner";

const OwnerStoreNamePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const [storeValue, setStoreValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function onClickToNext() {
    dispatch(setStoreName(storeValue));
    dispatch(setPhone(phoneNumber));
    navigate('/owner/storelocation');
  } 

  return (
    <>
      <Header title="회원가입" />
      <BodyTop title="매장명 & 연락처" />
      <div id="search" className="m-8 mt-10">
        <p className="text-lg mb-5 font-bold">매장이름과 사장님 연락처를 설정해주세요</p>
        <InputValue title="매장이름" value={storeValue} setValue={setStoreValue} placeHorder="매장이름 입력"/>
        <InputValue title="휴대전화" value={phoneNumber} setValue={setPhoneNumber} placeHorder="010-XXXX-XXXX"/>
        <Button title="완료" onClickEvent={onClickToNext}/>
      </div>
    </>
  );
};

export default OwnerStoreNamePage;
