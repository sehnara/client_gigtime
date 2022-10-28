import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { SignUpState } from "../../../context/signUp";
import { jobs, checkEmptyForm } from ".";
import SignDataType from "../../../context/interfaces/SignUpType";

import Button from "../../../components/Buttons/Normal/view";
import Header from "../../../components/Header/view";


const SignUpJobs = () => {
  const navigate = useNavigate()
  const [sign, setSign] = useRecoilState(SignUpState)

  function goNextStep() {
    const isFulfilled = checkEmptyForm(sign)
    if(isFulfilled){
      navigate('/owner/upload');
    }
    else{
      alert('희망하는 직무를 하나 이상 선택해주세요')
    }
  } 
  
  return (
    <>
      <Header title="회원가입"/>
      <div className="m-8 mt-10">
        <p className="text-sm mb-5 ">원하는 알바 유형을 모두 선택해주세요</p>
        <div>
          <div className="flex flex-wrap">
            {jobs.map((el) => 
              <button 
                key={el.id} 
                onClick={() => { 
                  !sign.category.map((e:any )=> e.name).includes(el.name)
                    ? setSign({...sign, category : [...sign.category, el]})
                    : setSign({...sign, category : sign.category.filter((e:any )=> e.name !== el.name)})
                }}
                className={
                  sign.category.map((e:any )=> e.name).includes(el.name) 
                  ? "text-xs font-bold bg-cyan-500 text-white px-4 h-7 py-1 rounded-2xl mr-3 mb-3" :
                   "text-xs bg-gray-200 px-4 h-7 py-1 rounded-2xl mr-3 mb-3"
                }
              >{el.name}</button>
            )}
          </div>
        </div>
        <Button title="다음" onClickEvent={goNextStep}/>
      </div>
    </>
  );
};

export default SignUpJobs;