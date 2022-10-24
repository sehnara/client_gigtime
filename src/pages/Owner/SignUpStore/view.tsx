import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import Header from "../../../components/Header/view";
import SignUpForm from "../../../components/Forms/SignUp/view";
import Button from "../../../components/Buttons/Normal/view";
import { SignUpState } from '../../../context/signUp';

const SignUpStorePage = () => {
  const navigate = useNavigate();

  function goNext() {
    navigate('/owner/storelocation');
  } 

  return (
    <>
      <Header title="회원가입" />
      <div id="search" className="m-8 mt-10">
        <p className="text-sm mb-5">매장 정보를 기입해주세요.</p>

        <SignUpForm 
            title="아이디" 
            placeholder="아이디 입력"
            mode = 'id' 
            state={SignUpState}
        /> 

        <SignUpForm 
            title="비밀번호" 
            placeholder="비밀번호 입력"
            mode = 'password' 
            state={SignUpState}
        /> 

        <SignUpForm 
            title="매장명" 
            placeholder="매장명 입력"
            mode = 'name' 
            state={SignUpState}
        /> 
        
        <SignUpForm 
            title="연락처"  
            placeholder="연락처 입력"
            mode = 'phone' 
            state={SignUpState}
        />

        <Button title="다음" onClickEvent={()=>{goNext()}}/>
      </div>
    </>
  );
};

export default SignUpStorePage;
