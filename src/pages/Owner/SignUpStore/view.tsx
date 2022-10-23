import React, { useState } from "react";
import Header from "../../../components/Header/view";
import { useNavigate } from "react-router-dom";

import SignUpForm from "../../../components/Forms/SignUp/view";
import Button from "../../../components/Buttons/Normal/view";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
// import { setPhone, setStoreName } from "../module/slices/owner";

const SignUpStorePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const [storeValue, setStoreValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function goNext() {
    // dispatch(setStoreName(storeValue));
    // dispatch(setPhone(phoneNumber));
    navigate('/owner/storelocation');
  } 

  return (
    <>
      <Header title="회원가입" />
      <div id="search" className="m-8 mt-10">
        <p className="text-sm mb-5">매장 정보를 기입해주세요.</p>

        <SignUpForm 
            title="매장명" 
            value={storeValue} 
            setValue={()=>{}} 
            placeholder="매장명 입력"
        /> 
        
        <SignUpForm 
            title="연락처" 
            value={phoneNumber} 
            setValue={()=>{}} 
            placeholder="연락처 입력"
        />

        <Button title="다음" onClickEvent={()=>{goNext()}}/>
      </div>
    </>
  );
};

export default SignUpStorePage;
